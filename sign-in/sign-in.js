document.addEventListener("DOMContentLoaded", () => {
    let formsign  = document.getElementById("SignIn");
    formsign.addEventListener("submit",(e)=> {
        e.preventDefault();
        let username = formsign.floatingInput.value
        let password = formsign.floatingPassword.value

        let users = GetUsers();

        users = users.filter(user => {
            if(user["username"] == username && user["password"] == password){
                return user;
            }
        });

        if (users.length == 1){
            window.location.href = "../Admin/Admin.html"
        }
        else {
            alert("Wrong username or password");
        }
    })
})

function GetUsers() {
    //Set and get localstorage
    console.log(localStorage["Users"] == undefined ? "Getting products" : "Loading products");
    if(localStorage["Users"] == undefined){
      //Data
      fetch("../Data/Data.json")
      //Convert to json
      .then(rawData => rawData.json())
      //Add the data to local storage
      .then(i => {
        localStorage.setItem("Users", JSON.stringify(i["Users"]))
      }); 
    }
      const data = JSON.parse(localStorage.getItem("Users"));
      return data;
  };