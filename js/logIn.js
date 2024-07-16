function init() {
    // Add an event listener to the submit button
    let submitBtn = document.getElementById('logIn');
    submitBtn.addEventListener("click", userLogIn);

    function userLogIn() {
            //שמירת הערכים
        let email = document.querySelector('#userEmail').value;
        let password = document.querySelector('#userPassword').value;
            //בדיקה אם אין תאים ריקים
        if (email === "" || password === "") {
            alert("All details must be complete");
            return;
        }
        const newUser = new User("", email, password);
        newUser.logIn();
        return;

    }
}
init();