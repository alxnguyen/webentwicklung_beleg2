function myFunction() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const json_data = JSON.stringify({email: email, password: password});
    fetch("https://webentwicklung-beleg-backend.herokuapp.com/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: json_data,
        credentials: "include"
    })
    .then(res => res.text())
    .catch(error => console.log(error));
}