function myFunction() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const json_data = JSON.stringify({email: email, password: password});
    console.log(json_data);
    fetch("https://webentwicklung-beleg-backend.herokuapp.com/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: json_data
    })
    .then(res => res.text())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}