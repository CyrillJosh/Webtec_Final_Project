document.addEventListener("DOMContentLoaded", function(event) { 

  const Home = document.getElementById("Home");
  const Products = document.getElementById("Products");
  const Cart = document.getElementById("CartBody");

  Products.addEventListener("click", () => {
    window.location.href = "ProductsPage/Products.html";
    // this.location.replace("ProductsPage/Products.html")
  })
  Home.addEventListener("click", () => {
    window.location.href = "index.html";
    // this.location.replace("index.html")
  })

  if (localStorage.getItem("CartId") != null){
    Cart.innerHTML+=localStorage.getItem("CartID");
  }


  function GetProducts() {
      try {
        //See if json server is available
        const response =  fetch('http://localhost:3000/Products');
        const data =  response.json();
        console.log("try", data);
        return data;
    
      } catch (error) {
        //Get localstorage
        fetch("Data/Data.json")
        .then(rawData => rawData.json())
        .then(i => {
          localStorage.setItem("Items", JSON.stringify(i["Products"]))
        }); 
        localStorage.setItem("Items", JSON.stringify(jsondata))
        const data = JSON.parse(localStorage.getItem("Items"));
        console.log("catch", data);
        return data;
      }
    };

  let ProductList = GetProducts();
  console.log(ProductList);
});