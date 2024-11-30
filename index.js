document.addEventListener("DOMContentLoaded", function(event) { 

  //Get the cart body
  const Cart = document.getElementById("CartBody");
  
  //Check list 
  let ProductList = GetProducts();
  console.log(ProductList != null ? "Products Loaded" : "Products not found!");
  
  //Go to Products
  document.getElementById("Products").addEventListener("click", () => {
    window.location.href = "ProductsPage/Products.html";
    // this.location.replace("ProductsPage/Products.html")
  })

  //Go to homepage
  document.getElementById("Home").addEventListener("click", () => {
    window.location.href = "index.html";
    // this.location.replace("index.html")
  })

  //ReDisplay saved CartProducts
  if(Object.keys(localStorage).includes("cartitems")){
    DisplayToCart(Array.from(JSON.parse(localStorage.getItem("cartitems"))));
  }

  //Go to Checkout
  document.getElementById("CheckOut").addEventListener("click", () => {
    window.location.href = "Checkout/Checkout.html";
  })
});

//Add to cart function
function DisplayToCart(items) {
  //Get Cart body
  const cart = document.getElementById("CartBody");
  cart.innerHTML = "";
  if(items == null) return;
  //Get products
  let prods = GetProducts();
  console.log(prods == null ? "Products not found": "Products Loaded");
  //reduce
  let reduced;
  console.log(items);
  //nothing to reduce
  if(items.length == 1){
    reduced = items;
  }
  else
  {
    reduced= items.reduce((item1, item2)=> {
      const found = item1.find(val => val.id === item2.id && val.color === item2.color && val.storage === item2.storage && val.network === item2.network)
      if(found){
        found.qty+=item2.qty
      }
      else{
        item1.push({...item2, qty: item2.qty})
      }
      return item1
    }, [])
  }
  //reset cartitems
  localStorage.removeItem("cartitems");
  localStorage.setItem("cartitems", JSON.stringify(reduced));
  reduced.forEach(cartitem => {
    let prod = prods.filter(x => x.id == cartitem.id)[0];
    cart.innerHTML += 
    `<div class="col-12 d-flex justify-content-between align-items-center px-2">
      <img src="${prod.image}" alt="${prod.name}" Height="75rem" Width="100px" class="object-fit-scale">
      <div class="w-100 ps-5">
        <h4 class="text-start">${prod.name}</h4>
        <ul class="list-inline list-unstyled">
          <li class="list-inline-item">
            <p><b>Color</b>: ${cartitem.color}</p>
          </li>
          <li class="list-inline-item">
            <p><b>Storage:</b> ${cartitem.storage} </p>
          </li>
          <li class="list-inline-item">
            <p><b>Network:</b> ${cartitem.network}</p>
          </li>
        </ul>
        <div class="d-flex justify-content-between pe-5">
        <h5>x${cartitem.qty}</h5>
        <h5>₱${prod.price[`${cartitem.storage}`].toLocaleString()}</h5>
        </div>
      </div>
      <button type="button" class="btn-close removefromcart" data-id="${cartitem.id}" data-color="${cartitem.color}" data-storage="${cartitem.storage}" data-network="${cartitem.network}"></button>
    </div>`
    ;
  })
  //refresh RemoveItem function
  RemoveItem()
}

//Remove from cart
function RemoveItem(){
  //Get the remove buttons
  const remove = document.getElementsByClassName("removefromcart");
  //Check for each buttons
  Array.from(remove).forEach(btn => {
    btn.addEventListener("click", () => {
      //Get the cartitems
      let cartitems = localStorage.getItem("cartitems");
      cartitems = Array.from(JSON.parse(cartitems));
      let dataset = btn.dataset;

      //Removes 1 from qty
      cartitems = cartitems.map(item => {
        if (item.id == dataset.id && item.color == dataset.color && item.storage == dataset.storage && item.network == dataset.network){
          item.qty -= 1;
        }
        return item;
      })

      //Removes items with 0 qty
      cartitems = cartitems.filter(x => x.qty > 0)
      //reset cartitems
      localStorage.removeItem("cartitems");
      localStorage.setItem("cartitems", JSON.stringify(cartitems));
      //redisplays cart items
      DisplayToCart(cartitems);
    })
  });
}

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
  console.log(localStorage["Items"] == undefined ? "Getting products" : "Loading products");
  if(localStorage["Items"] == undefined){
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