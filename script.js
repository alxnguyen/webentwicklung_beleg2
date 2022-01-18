function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const json_data = JSON.stringify({email: email, password: password});
    fetch("https://webentwicklung-beleg-backend.herokuapp.com/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: json_data,
        credentials: "include"
    })
    .then(res => 
        {
            if(res.status === 2010) {
                window.location.href = "./map.html";
            }

            if(res.status === 400) {
                document.getElementById("warning").innerHTML = "Login fehlgeschlagen.";
            }
        })
    .catch(error => console.log(error));
}

function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    if(email.length === 0 || password.length === 0 || password2.length === 0) {
        document.getElementById("warning").innerHTML = "Bitte füllen Sie alle Felder aus.";
        return;
    }
    if(password != password2) {
        document.getElementById("warning").innerHTML = "Passwörter stimmen nicht überein.";
        return;
    }
    const json_data = JSON.stringify({email: email, password: password});
    fetch("https://webentwicklung-beleg-backend.herokuapp.com/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: json_data
    })
    .then(res => 
        {
            if (res.status === 201) {
                window.location.href = "./register_success";
            }
            if(res.status === 500) {
                document.getElementById("warning").innerHTML = "Irgendetwas ist schief gelaufen.";
            }
            if(res.status === 409) {
                document.getElementById("warning").innerHTML = "Ein Konto mit dieser E-Mail existiert bereits.";
            }
        })
    .catch(error => console.log(error));
}

function goToHome() {
    window.location.href = "./index.html";
}