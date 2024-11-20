document.addEventListener("DOMContentLoaded", () => {
    const Home = document.getElementById("Home");
    const Products = document.getElementById("Products");

    //Go to Products page
    Products.addEventListener("click", () => {
        window.location.href = "../ProductsPage/Products.html";
        // this.location.replace("ProductsPage/Products.html")
    })

    //Go to Homepage
    Home.addEventListener("click", () => {
        window.location.href = "../index.html";
    // this.location.replace("../index.html")
  })
})