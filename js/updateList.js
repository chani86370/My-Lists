function init() {
    let ListId = localStorage.getItem("currentLists") //קבלת קוד הרשימה html
    const fRequest = new FXMLHttpRequest();
    fRequest.responseType = 'json';
    let url = `https://www.myList.com/api/List=${ListId}/getSpecificList`
    fRequest.fOpen('GET', url);
    fRequest.fOnload = function() {
        if (fRequest.status === "404") {
            alert("Something went wrong...");
        } else {
            let answer = fRequest.fResponse;
            upDate(answer); //קבלת הרשימה המבוקשת
        }
    }
    fRequest.fSend();

    function upDate(listReturn) {
        let objReturn = JSON.parse(listReturn)
        let existItems = document.querySelector("#existItems");
        let existName = document.querySelector("#name-of-list");
        let existDate = document.querySelector("#create");
        existName.value = `${objReturn.name}`;
        existDate.innerHTML += `${objReturn.date}`;
        objReturn.items.forEach(element => {
            let CreateItem = ` <div id=Div${element.code} class=itemid>
            <label class=labelItems id=item${element.code} for="item${element.code} ">${element.name}</label>
            <input type="checkbox" id=item${element.code}1>
            <button type="button"  id=v${element.code}>cancel</button>

        </div>`
            existItems.insertAdjacentHTML('beforeend', CreateItem);
            let check = document.querySelector(`#item${element.code}1`);
            check.checked = element.done;
            let btn = document.querySelector(`#v${element.code}`);
            btn.addEventListener('click', removeItem);
        });
    }

    function removeItem(e) {
        let name = e.target.id;
        let existItems = document.querySelector(`#Di${name}`);
        existItems.remove();
    }
    let items = document.querySelector("#items");
    items.addEventListener("click", openList);

    function openList() {
        let item = document.querySelector("#item");
        let input = document.createElement("input");
        input.classList.add("itemInput");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "item:");
        item.appendChild(input);
    }
    let save = document.querySelector("#update");
    save.addEventListener("click", update);
}
init();