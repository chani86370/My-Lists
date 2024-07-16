//בדיקת תקינות שהקישור טוב!!!!!
const newFServer = new Server();

function netWork(fajax) //קבלת בקשה
{
    try {
        let tempArr = fajax.fUrl.split('/'); //חילוק למערך של מחרוזות לפי:"/"
        let address = tempArr[2]; // המקום של כתובת האתר במערך שיצרתי
        if (address === "www.myList.com") {
            setTimeout(() => {
                fajax.response = newFServer.handlerResponse(fajax);
                fajax.status=newFServer.status;
                return fajax.fOnload();
            }, 0);
        }
    } catch (e) { //אם הכתובת אינה תקינה
        alert("the url is not valid!! " + e) //מחזיר את סוג השגיאה+התראה
    }
}