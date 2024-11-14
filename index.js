document.addEventListener("DOMContentLoaded", function(event) { 

  //Get the buttons
  const Home = document.getElementById("Home");
  const Products = document.getElementById("Products");

  //Get the cart body
  const Cart = document.getElementById("CartBody");
  
  //Check list 
  let ProductList = GetProducts();
  console.log(ProductList == null ? ProductList : "Products loaded");
  
  //Go to Products
  Products.addEventListener("click", () => {
    window.location.href = "ProductsPage/Products.html";
    // this.location.replace("ProductsPage/Products.html")
  })

  //Go to homepage
  Home.addEventListener("click", () => {
    window.location.href = "index.html";
    // this.location.replace("index.html")
  })

  //Reload the Cart items into the cart
  if (localStorage.getItem("CartId") != null){
    Cart.innerHTML+=localStorage.getItem("CartID");
  }
});

//Get products
function GetProducts() {
    try {
      //See if json server is available
      const response =  fetch('http://localhost:3000/Products');
      const data =  response.json();
      console.log("try", data);
      return data;
  
    } catch (error) {
      //Set and get localstorage

      //Data
      fetch("Data/Data.json")
      //Convert to json
      .then(rawData => rawData.json())
      //Add the data to local storage
      .then(i => {
        localStorage.setItem("Items", JSON.stringify(i["Products"]))
      }); 

      //Get the data from the local storage
      const data = JSON.parse(localStorage.getItem("Items"));
      return data;
    }
  };