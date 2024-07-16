function init() {
    let signUp = document.querySelector("#signUp");
    signUp.addEventListener('click', saveUserDetail) //Adding the event when clicked
    function saveUserDetail(e) {
        //שמירת הערכים
        let name = document.querySelector('#name').value + " " + document.querySelector('#lastName').value;
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#pwd').value;
        if (name === "" || email === "" || password === "") { //אם לא מילאו את כל הפרטים
            alert("All details must be complete");
            return;
        }
        let nameNotValid = /^[a-zA-Z\s]*$/;
        if (!nameNotValid.test(name)) {
            alert("The name is not valid");
            return;
        }
        //בדיקת תקינות האימייל
        const emailNotValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!emailNotValid.test(email)) {
            alert("The email address is not valid");
            return;
        }
        //בדיקת סיסמא חזקה   ובדיקה האם הסיסמה קטנה מ8 תווים
        const PswNotValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const result = PswNotValid.test(password);
        if (!PswNotValid.test(password)) {
            alert("Enter a strong password of 8 characters");
            return;
        }
        //אם כל הבדיקות תקינות 
        const newUser = new User(name, email, password); //יצירת עצם USER חדש
        newUser.signUp(e); // ושולחת בקשת שמירה לסרבר שליחה לפונקציה שבודקת שאין משתמש בעל מייל זהה
    }
}
init()