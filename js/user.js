class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.lists = [];
    }
    signUp(ev) {
        const fRequest = new FXMLHttpRequest(); //בניית בקשה חדשה לסרבר
        fRequest.responseType = 'json';
        let url = "https://www.myList.com/api/user/signIn" //
        fRequest.fOpen('POST', url); //פתיחת בקשה לעריכה
        fRequest.fOnload = function() { //כשהבקשה נטענת בדיקה אם ניתן לבצע את הבקשה
            if (fRequest.status === "404") //אם התשובה היא שגיאה
            {
                alert("sorry, User exist");
            } else {
                window.location.hash = 'allLists';
            }
        }
        fRequest.fSend(JSON.stringify(this)); //שליחת הבקשה
    }
    logIn() {
        const fRequest = new FXMLHttpRequest(); //בניית בקשה חדשה
        fRequest.responseType = 'json';
        let url = "https://www.myList.com/api/user/logIn";
        fRequest.fOpen('POST', url); //פתיחת בקשה לעריכה
        fRequest.fOnload = function() { //טעינת הבקשה
            if (fRequest.status === "404") //שלא הכניס את הפרטים הנכונים אם התקבלה שגיאה
            {
                alert("sorry, the email or the password are inncorect");
            } else {
                window.location.hash = 'allLists';
            }
        }
        fRequest.fSend(JSON.stringify(this));
    }
}

class List {
    constructor(code, name, items, done = 0) {
        let date = new Date();
        this.code = code;
        this.items = items;
        this.name = name;
        this.done = done;
        this.date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
    addList(ev) {
        const fRequest = new FXMLHttpRequest(); //בנית בקשה חדשה
        let url = "https://www.myList.com/api/list/addList"
        fRequest.responseType = 'json';
        fRequest.fOpen('POST', url); //פתיחת בקשהנ לעריכה
        fRequest.fOnload = function() { //בקשה נטענת
            if (fRequest.status === "404") //קיימת רשימה עם שם זהה
            {
                alert("sorry, you already have a list in that name");
            } else {
                window.location.hash = 'allLists';
            }
        }
        fRequest.fSend(JSON.stringify(this)); //שליחת הבקשה
    }
    updateList(ev) { //עדכון בקשה
        const fRequest = new FXMLHttpRequest(); //בקשה חדשה
        fRequest.responseType = 'json';
        let url = "https://www.myList.com/api/list/updateExistsList"
        fRequest.fOpen('PUT', url); //פתיחת בקשה 
        fRequest.fOnload = function() {
            if (fRequest.status === "404") {
                alert("sorry, you already have other list in that name");
            } else {
                window.location.hash = 'allLists'; // getAllLists();
            }
        }
        fRequest.fSend(JSON.stringify(this));
    }
}

function removeList() {
    let ListId = this.getAttribute('data-List-id-cancel'); //קבלת קוד הרשימה html
    const fRequest = new FXMLHttpRequest();
    fRequest.responseType = 'json';
    let url = "https://www.myList.com/api/list/removeLists"
    fRequest.fOpen('DELETE', url); //פתיחת בקשה למחיקה
    fRequest.fOnload = function() {
        if (fRequest.status === "404") {
            alert("Something went wrong..."); //לא נמצאה הרשימה
        }
    }
    fRequest.fSend(JSON.stringify(ListId)); //שליחת הקוד לבקשת מחיקה
}

function findList() {
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
            return answer; //קבלת הרשימה המבוקשת
        }
    }
    fRequest.fSend();
}
