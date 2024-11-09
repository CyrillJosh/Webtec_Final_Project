const ibody = document.getElementById("body");
const Home = document.getElementById("Home");
const Products = document.getElementById("Products");
const Cart = document.getElementById("Cart");

Home.addEventListener("click", () => SetPage("HomePage/HomePage.html"))
Products.addEventListener("click", () => SetPage("ProductsPage/Products.html"))


function GetProducts() {
    try {
      //See if Nodejs is available
      const response =  fetch('http://localhost:3000/Products');
      const data =  response.json();
      console.log("try", data);
      return data;
  
    } catch (error) {
      //Get localstorage
      const data = JSON.parse(localStorage.getItem("Items"));
      console.log("catch", data);
      return data;
    }
  };

//Sets window
function SetPage(path) {
    ibody.innerHTML = '<iframe src='+path+' class="container-fluid p-0" style="Height:100%"></iframe>';
};

SetPage("HomePage/HomePage.html");
let ProductList = GetProducts();
console.log(ProductList);