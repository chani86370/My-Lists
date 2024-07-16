class Server {
    constructor() {
        this.type = null;
        this.url = null;
        this.action = null;
        this.data = null;
        this.status=null;
    }

    handlerResponse(fajax) {
        this.url = fajax.url;
        this.type = fajax.type;
        this.data = fajax.data;
        this.findAction(); //שליחה של הבקשה לפונקצה הבאה:
        return this.sendToTheDB(); //שליחה לפונקציה:
    }
    findAction() {
        let tempArr = this.url.split('/'); //מחלק למערך
        this.action = tempArr[5]; //מציב לסרבר את הפעולה מהמקום החמישי במערך
    }
    sendToTheDB() {
        if (this.type === "POST" && this.action === "signIn") {
            let answer = getUser(JSON.parse(this.data)); //המרת המחרוזת לעצם ושליחה לפונקציה
            if (answer === null) { //במקרה שלא נמצא המשתמש
                setUser(JSON.parse(this.data)) //הכנסת משתמש חדש
                this.status="200"; //הצלחה
            } else {
                this.status= "404"; //כישלון
            }
        }
        if (this.type === "POST" && this.action === "logIn") {
            let user = JSON.parse(this.data);
            let person = getUser(user);
            if (person !== null) { //אם המשתמש נמצא
                if (JSON.parse(person).password !== JSON.parse(this.data).password) { //בדיקה שהסיסמא תואמת
                    this.status= "404";; //במידה שלא יוחזר כישלון
                } else {
                    localStorage.setItem('currentUser', JSON.parse(person).email); //עדכון משתמש נוכחי
                    this.status= "200"; //מחזיר שהצליח
                }
            } else {
                this.status= "404";
            }
        }
        if (this.type === "POST" && this.action === "addList") { //בקשה להוספת רשימה
            let list = JSON.parse(this.data)
            list.code = buildCodeLists();
            let currentUser = localStorage.getItem('currentUser'); //קבלת המשתמש הנוכחי
            let degel = true;
            let arrLists = getLists(currentUser); //קבלת הרשימות של המשתמש הנוכחי
            arrLists.forEach(element => { //בדיקות על כל רשימה שאין רשימה עם שם זהה:
                if (element.name === list.name && element.code !== list.code)
                    degel = false;; //במידה וקיימת רשימה זהה
            });
            arrLists.push(list); //דחיפה למערך את הרשימה החדש
            if (degel === false)
            this.status= "404";
            else {
                setLists(arrLists); //עדכון של הרשימות לאחר שינוי
                this.status= "200"; //הצלחה
            }
        }
        if (this.type === "DELETE" && this.action === "removeLists") { //בקשת מחיקה
            let currentUser = localStorage.getItem('currentUser'); //קבלת משתמש נוכחי
            let arrLists = getLists(currentUser); //קבלת הרשימות של המשתמש הנוכחי
            let deleteItem; //הגדרת משתנה
            for (let index = 0; index < arrLists.length; index++) { //עובר על כל המערך של הרשימות
                if (arrLists[index].code == JSON.parse(this.data)) { //חיפוש לפי קוד את הרשימה אותה אני רוצה למחוק מתוך המערך של הרשימות
                    deleteItem = index; //שמירת האינדקס של הרשימה למחיקה
                }
            }
            arrLists.splice(deleteItem, 1); //מחיקת הפריט מהמערך
            setLists(arrLists); //עדכון מערך הרשימות לאחר השינוי
            this.status= "200"; //הצלחה
        }
        if (this.type === "GET" && this.action === "getAllLists") {
            this.status="200"; //בקשת קבלת כל הרשימות
            return JSON.stringify(getLists(localStorage.getItem('currentUser')));
            //קבלת כל הרשימות בצורת מחרוזת
        }
        if (this.type === "GET" && this.action === "getSpecificList") { //בקשה לקבלת רשימה מסוימת
            let answer = null;
            let tempArr = this.url.split('/'); //חילוק הקישור למערך
            let arr = tempArr[4].split('='); // חילוק הקישור למערך לפי סימן =
            let arrLists = getLists(localStorage.getItem('currentUser')) //קבלת כל הרשימות של המשתמש הנוכחי
            arrLists.forEach(element => { //בדיקה על כל הרשימה אם הקוד שווה למקום הראשון בarr
                if (element.code == arr[1]) {
                    answer = element; //שמירת הרשימה שחיפשתי
                }
            });
            if (answer === null) { //במידה ולא נמצאה הרשימה
                this.status= "404";
            } else {
                this.status="200"; //במידה ונמצאה הרשימה נחזיר את הרשימה בצורת מחרוזת
                return JSON.stringify(answer);
            }
        }
        if (this.type === "PUT" && this.action === "updateExistsList") { //בקשת עריכת רשימה 
            let list = JSON.parse(this.data);
            let flag = true;
            let currentUser = localStorage.getItem('currentUser'); //קבלת משתמש נוכחי
            let arrLists = getLists(currentUser); //קבלת כל הרשימות של המשתמש
            arrLists.forEach(element => {
                if (element.name === list.name && element.code != list.code) { //אם קיימת רשימה אחרת בעלת שם זהה
                    flag = false;
                }
            });
            let updateIndex;
            for (let index = 0; index < arrLists.length; index++) {
                if (arrLists[index].code == list.code) {
                    updateIndex = index;
                }
            }
            arrLists[updateIndex] = list;
            if (flag === true) {
                setLists(arrLists); //אם אין 2 רשימות עם אותו השם תעדכן בלוקל סטורג'
                this.status= "200"; //הצלחה
            } else {
                this.status= "404";//שגיאה
            }
        }
    }
}