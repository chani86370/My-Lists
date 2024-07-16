function newList(e) { //רשימה חדשה
    let nameOfList = document.getElementById("name-of-list").value;
    let items = document.querySelectorAll(".itemInput");
    let index = 0;
    if (nameOfList !== "") {
        let arrayItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].value != "") {
                arrayItems[index] = {
                    code: index,
                    name: items[i].value,
                    done: false
                }
                index++;
            }
        }
        const newList = new List(0, nameOfList, arrayItems);
        newList.addList(e);
    } else {
        alert("enter name");
    }
}

function update(e) { //לערוך רשימה
    let code;
    let idList = JSON.parse(localStorage.getItem('currentLists'));
    let nameOfList = document.getElementById("name-of-list").value;
    let items = document.querySelectorAll(".labelItems");
    if (nameOfList !== "") {
        let exists = [];
        let done = 0;
        let code = 0;
        items.forEach(element => {
            let check = document.querySelector(`#${element.id}1`);
            exists.push({
                code: code++,
                name: element.innerHTML,
                done: check.checked
            })
            if (check.checked)
                done++;
        });
        let newiItems = document.querySelectorAll(".itemInput");
        let index = exists.length;
        if (newiItems !== null) {
            for (let i = 0; i < newiItems.length; i++) {
                if (newiItems[i].value != "") {
                    exists[index] = {
                        code: index,
                        name: newiItems[i].value,
                        done: false
                    }
                    index++;
                }
            }
        }
        if (done !== 0) { done = done / exists.length * 100; }
        const upList = new List(idList, nameOfList, exists, done);
        upList.updateList(e);

    } else
        alert("The name is not valid");
}
