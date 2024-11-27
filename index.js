document.addEventListener("DOMContentLoaded", function(event) { 

  //For testing only!
  //localStorage.clear();

  //Get the buttons
  const Home = document.getElementById("Home");
  const Products = document.getElementById("Products");

  //Get the cart body
  const Cart = document.getElementById("CartBody");
  
  //Check list 
  let ProductList = GetProducts();
  console.log(ProductList != null ? "Products Loaded" : "Products not found!");
  
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

  //ReDisplay saved CartProducts
  let cartitems = Object.keys(localStorage).filter(x => x.includes("CartItem")).map(x=> x[x.length-1]);
  cartitems.forEach(item_id => {
    AddToCart(item_id, true)
  })
});

//Add to cart
function AddToCart(_id, skip) {
  //Get Cart body
  const cart = document.getElementById("CartBody");
  
  //Get products
  let Items = GetProducts();

  Items.forEach( item => {
    //Selects the product using the id
    if (item["id"] == _id)
    {
      //Check if cart item added is already in
      if (Object.keys(localStorage).filter(x => x.includes(_id)).toString() != "" && !skip){
        console.log("Item exists");
      }
      else {
        console.log("not exists");
        //Initialize
        let image = item["variants"]["Base"]["image"];;
        let name = item["name"];
        cart.innerHTML+= `<div class = "col-12" id="CartItem${_id}">
        <div class="row align-items-center">
          <div class="p-2 border m-2 col-2"style="Height: 75px; Width: 75px"><img src="${image}" class="h-100 w-100 object-fit-scale"></div>
            <p class="h5 col-6">${name}</p>
            <button type="button" class="btn-close col-1 offset-1" onclick="RemoveCartItem(${_id})"></button>
          </div>
        </div>`;
        
        //ADD Item to Localstorage for checking
        localStorage.setItem(`CartItem${_id}`, 1);
      }
    }
  })
}

//Get products
function GetProducts() {
      //Set and get localstorage
      console.log(Object.keys(localStorage)["Items"] == undefined ? "Loading products" : "Getting products");
      if(Object.keys(localStorage)["Items"] == undefined){
        //Data
        fetch("Data/Data.json")
        //Convert to json
        .then(rawData => rawData.json())
        //Add the data to local storage
        .then(i => {
          localStorage.setItem("Items", JSON.stringify(i["Products"]))
        }); 
      }
        const data = JSON.parse(localStorage.getItem("Items"));
        return data;
  };

  //Remove Cart item
  function RemoveCartItem(id){
    const cartitem = document.getElementById(`CartItem${id}`);
    //console.log(cartitem);
    cartitem.innerHTML = " ";
    //remove item from local storage
    localStorage.removeItem(`CartItem${id}`)
  }

  function CheckOut() {
    window.location.href = "Checkout/Checkout.html";
  }