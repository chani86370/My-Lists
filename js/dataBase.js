function getUser(person) { //לקבל משתמש
    return localStorage.getItem(person.email);
}

function setUser(newPerson) {
    localStorage.setItem('currentUser', newPerson.email) //עדכון המשתמש נוכחי
    localStorage.setItem(newPerson.email, JSON.stringify(newPerson)); //שמירת המשתמש
}

function getLists(email) //קבלת הרשימות של משתמש 
{
    return JSON.parse(localStorage.getItem(email)).lists;
}

function setLists(lists) {
    let obj = JSON.parse(localStorage.getItem(localStorage.getItem('currentUser'))); // קבלת הנתונים של משתמש נוכחי
    obj.lists = lists; //עדכון הרשימות לרשימות לאחר השינוי
    localStorage.setItem(localStorage.getItem('currentUser'), JSON.stringify(obj)); //עדכון המשתמש בעצם החדש לאחר השינויים
}

function buildCodeLists() {
    let obj = JSON.parse(localStorage.getItem(localStorage.getItem('currentUser')));
    // קבלת הנתונים של משתמש נוכחי
    let code = ((obj.lists).length) + 1; //נתינת קוד לרשימה חדשה(לפי המיקום במערך)            
    let arrLists = obj.lists;
    let sameCode = true;
    while (sameCode) {
        sameCode = false;
        arrLists.forEach(element => {
            if (element.code === code) {
                code++;
                sameCode = true;
            }
        });
    }
    localStorage.setItem('currentLists', code); //הכנסב ללוקל לפי מפתח של רשימה נוכחית
    return code; //החזרת הקוד

}