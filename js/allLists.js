function init() {
    let listArr;
    getAllLists(); //פונקציה לקבלת כל הרשימות
    let logOut = document.querySelector("#log-out");
    if (logOut !== null)
        logOut.addEventListener("click", () => {
            localStorage.setItem('currentUser', "");
            window.location.hash = 'welcome';
        }) //כשנלחץ logout

    let newList = document.querySelector("#temp"); //בקשה לרשימה חדשה
    newList.addEventListener("click", () => { window.location.hash = 'newList'; }); //מעבר לדף של רשימה חדשה

    function getAllLists() {
        const fRequest = new FXMLHttpRequest(); //בנית בקשה לקבלת כל הרשימות
        fRequest.responseType = 'json';
        let url = "https://www.myList.com/api/user/getAllLists"
        fRequest.fOpen('GET', url);
        fRequest.fOnload = function() { //בזמן טעינת הבקשה -בנית כל הרשימות
            listArr = JSON.parse(fRequest.fResponse)
            buildTheArrLists(listArr); //בנית הרשימות ע"י שליחת כל הרשימות של המשתמש
        }
        fRequest.fSend(); //שליחת הבקשה
    }

    function buildTheArrLists(response) { //בנית הרשימות ע"י קבלת כל הרשימות
        if (response === null)
            return;
        let allLists = document.querySelector("#All-Lists"); //קבלת דיב כל הרשימות
        allLists.innerHTML = ""; //הדף ריק
        let div = document.createElement('div'); //יצירת דיב חדש
        div.id = "gridL";
        allLists.appendChild(div); // allListsפתיחת הדיב בדף
        response.forEach(element => { // עובר על כל רשימה שקיבל ויוצר אותה
            let createList =
                `<form class="build">
            <section id="list${element.code}">
                <h3 class="cssLabel"><strong>${element.name}</strong></h3><br>
                <h3 class="cssLabel">date:${element.date} </h3>
                <h3 class="cssLabel">done: </h3>
                <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                </div>
                <button class="btn nice" data-List-id-cancel=${element.code}>cancel</button>
                <button class="btn nice" data-target="list-page" data-List-id-update=${element.code}>update</button>
               
            </section>
        </form>`;
            div.insertAdjacentHTML('beforeend', createList); //beforeend- יצירת הרשימה בדיב 
            let progress = document.querySelector(`#list${element.code} .progress-bar`);
            progress.style.width = `${element.done}%`; //עדכון פס התקדמות ע"פ אחוזי ביצוע
            let btns = document.querySelectorAll(`#list${element.code} button`); //קבלת הכפתורים של רשימה
            btns[0].addEventListener('click', removeList); //כפתור cancel
            btns[0].addEventListener('click', getAllLists); //כשנלחץ cancel קבלת כל הרשימות מחדש
            btns[1].addEventListener('click', () => { //כשנלחץ כפתור update
                localStorage.setItem("currentLists", element.code); //עדכון הרשימה הנוכחית
                window.location.hash = 'updateList'; //מעבר לדף
            });
        });
    }
    let search = document.querySelector("#search-input");
    search.addEventListener("input", searchLists); //כשנכתב בתיבת חיפוש

    function searchLists() {
        let btnSearch = document.getElementById('search-input').value; //קבלת הערך לחיפוש
        let arrSearchLists = [];
        for (let i = 0; i < listArr.length; i++) {
            const element = listArr[i];
            if (element.name.indexOf(btnSearch) !== -1) {
                arrSearchLists.push(element);
            }
        }
        if (btnSearch === "") { //אם חיפשתי איבר ריק
            arrSearchLists = listArr;
        }
        let clearPage = document.getElementById("All-Lists"); //ריקון הדף
        clearPage.innerHTML = "";
        buildTheArrLists(arrSearchLists); //בניה מחדש של הרשימות 
    }
}
init();