
document.querySelector("#form").addEventListener("login", submitFun);


function submitFun(elme) {
    elme.preventDefault();
    username = document.querySelector("#name").value;
    password =  document.querySelector("#password").value;

    if (username == "nitya@gmail.com" && password == "sait") {
       
        window.location.href = "admin.html";
    } else {
        alert("Invalid username or password");
        document.querySelector("#form").reset();
    }
}