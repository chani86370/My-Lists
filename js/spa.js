
window.addEventListener('hashchange', replacePage);//בכל פעם שמשתנה הקישור למעלה..-תוסיף אירוע
replacePage();
function replacePage() {
    let hash = location.hash.replace('#', '');//החלפת # לרווח
    if (hash == "") {//כניסה ראשונית
        hash = "welcome";//עמוד כניסה
    }
    if (hash == "allLists" || hash == "newList") {
        let current = localStorage.getItem("currentUser");
        if (!current)
            hash = 'welcome';
    }
    let openPage = document.getElementById(hash).content;// התוכן של template המבוקש
    const contentDiv = document.querySelector('#contain');//מציאת הdiv שבתוך: main
    contentDiv.replaceChildren(openPage.cloneNode(true));//הכנסה לdiv (main) את openPage
}
