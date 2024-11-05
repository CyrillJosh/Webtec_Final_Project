const ibody = document.getElementById("body");
const Home = document.getElementById("Home");
const Products = document.getElementById("Products");
const Cart = document.getElementById("Cart");

SetPage("HomePage/HomePage.html");

Home.addEventListener("click", () => SetPage("HomePage/HomePage.html"))
Products.addEventListener("click", () => SetPage("ProductsPage/Products.html"))
Cart.addEventListener("click", () => SetPage("Cart/Cart.html"))



function SetPage(path) {
    ibody.innerHTML = '<iframe src='+path+' class="container-fluid p-0" style="Height:100%"></iframe>';
}

fetch("Data/Data.json")
.then(rawData => rawData.json())
.then(Items=>{
    localStorage.setItem("Items",JSON.stringify(Items));
})