document.addEventListener("DOMContentLoaded", function(event) { 
  
  //Get the form
  const FormFilter = document.getElementById("FormFilter");
  
  //Get the buttons
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

  //Get the list container
  const list = document.getElementById("list-container");

  //Get the Products
  let Items = GetProducts();
  
  FormFilter.addEventListener("reset", (e) => {
    //Redisplays products
    list.innerHTML="";
    Items.forEach(cell => {
      DisplayProduct(cell, list);
    })
  })

  //Displays each products
  Items.forEach(cell => {
    DisplayProduct(cell, list);
  })
  //console.log(Items);

  //Filter Products
  FormFilter.addEventListener("submit", (e) => {
    //Disables changing of url or reloading of page
    e.preventDefault();
    //Initialization
    let brand1 = FormFilter.iPhone.checked ? FormFilter.iPhone.value : "" ;
    let brand2 = FormFilter.Samsung.checked ? FormFilter.Samsung.value : "" ;
    let search = FormFilter.Search.value;
    let stor1 = FormFilter.Storage1.checked ? FormFilter.Storage1.value : "";
    let stor2 = FormFilter.Storage2.checked ? FormFilter.Storage2.value : "";
    let stor3 = FormFilter.Storage3.checked ? FormFilter.Storage3.value : "";
    let stor4 = FormFilter.Storage4.checked ? FormFilter.Storage4.value : "";
   
    filter(Items, search, [brand1, brand2], [stor1, stor2, stor3, stor4], list);
  })

  //ReDisplay saved CartProducts
  let cartitems = Object.keys(localStorage).filter(x => x.includes("CartItem")).map(x=> x[x.length-1]);
  cartitems.forEach(item_id => {
    AddToCart(item_id, true)
  })
  const btnCart = document.getElementsByClassName("AddtoCart");
  Array.from(btnCart).forEach(element => {
    element.addEventListener("click", ()=> {
      // console.log(element.dataset.id);
      //get Product by id

      //Display into modal
      let img = document.getElementById("modalimg");
      console.log(img);
      img.src="test";
    })
  });

})

//
//FUNCTIONS
//

//Display a product Function
function DisplayProduct(cell, DisplayList) {

  //NOTE: "d" stands for display

  //Check for product
  console.log(cell == null ? "Product not found!": "Product found");
    //Initialization
    let id = cell["id"];
    let brand = cell["brand"];
    let name = cell["name"];
    let image = cell["image"];

    let prices = cell["price"];
    let dgb = "";
    let priceperGBHTML = ""
    //displays each storage(GB) available and price per storage
    for (let prc in prices){
      dgb += prc + "/";
      priceperGBHTML += `<li class="list-inline-item me-3">
                            <input type="radio" name="Storage${id}" value="${prc}">
                            <label for="Storage${id}">${prc}</label>
                            <label for="Storage${id}"><div class="card px-2  m-2 bg-info">₱ ${prices[prc].toLocaleString()}</div></label>
                          </li>`;
    };
    //Removes the last "/"
    dgb = dgb.substring(0, (dgb.length -1));

    let networks = cell["specs"]["network"];
    let netHTML = "";
    //display each networks available
    for (let net in networks){
      netHTML += `<li class="list-inline-item me-3">
                            <input type="radio" name="Network" id="Network${id}" value="${networks[net]}">
                            <label for="Network${id}">${networks[net]}</label>
                          </li>`;
    }

    //displays each Color available
    let colors = "";
    let colorsHTML = "";
    cell["color"].forEach(item => {
      colors += item + "/";
      colorsHTML += ` <li class="list-inline-item me-3">
                            <input type="radio" name="color${id}" value="${item}">
                            <label for="color${id}">${item}</label>
                          </li>`;
    });
    //Removes the last "/"
    colors = colors.substring(0, (colors.length -1));
    
    //Display the products
    DisplayList.innerHTML += `
    <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center border rounded">
      <div class="p-3 w-100 h-100 d-flex flex-wrap justify-content-between">
      <div class="card-body">
      <img src="${image}" class="card-img-top object-fit-contain m-3" alt="..." Height="120rem">
          <hr class="m-0 mb-2 w-100" style="margin-top: -50rem">
          <h5 class="card-title">${name}</h5>
          <ul>
              <li>${brand}</li>
              <li>${dgb}</li>
              <li>${colors}</li>
          </ul>
        </div>
        <div class="d-flex justify-content-between align-items-center w-100">
          <h4>₱${Object.values(cell["price"])[0].toLocaleString()}</h4>
          <button type="button" data-id="${id}" class="btn btn-primary AddtoCart" data-bs-toggle="modal" data-bs-target="#modalscreen">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    `;
}

//Add to cart function
function AddToCart(_id, skip) {
  // console.log("ADDED TO CART", _id);
  //Get the form
  const FormCheckout = documents.getElementById("FormCheckout");  
  //Get Cart body
  const cart = document.getElementById("CartBody");
  
  //Get products
  let Items = GetProducts();

  Items.forEach( item => {
    //Selects the product using the id
    if (item["id"] == _id)
      {
        //Initialize
      let image = item["variants"]["Base"]["image"];;
      let name = item["name"];
      //Check if cart item added is already in
      if ((Object.keys(localStorage).filter((x) => x.includes(_id.toString()))).length >= 1 && !skip){
        console.log("Item exists");
        let amount = parseInt(localStorage.getItem(`CartItem${_id}`)) + 1;
        localStorage.removeItem(`CartItem${_id}`);
        localStorage.setItem(`CartItem${_id}`, amount);

        let cartitem = document.getElementById(`CartItem${_id}`);
        cartitem.innerHTML = `
        <div class="d-flex align-items-center justify-content-between h-100">
        <img src="${image}" class="object-fit-scale" height="125rem">
        <div class="container-fluid mx-5 d-flex justify-content-between">
        <p class="h5">${name}</p>
        <p class="h5">x${amount}</p>
      </div>
        <button type="button" class="btn-close col-1 offset-1" onclick="RemoveCartItem(${_id})"></button>
      </div>`;
      }
      else {
        console.log("not exists");
        cart.innerHTML+= `<div class = "w-100 my-5" id="CartItem${_id}">
        <div class="d-flex align-items-center justify-content-between h-100">
          <img src="${image}" class="object-fit-scale" height="125rem">
          <div class="container-fluid mx-5 d-flex justify-content-between">
            <p class="h5">${name}</p>
            <p class="h5">x1</p>
          </div>
          <button type="button" class="btn-close col-1 offset-1" onclick="RemoveCartItem(${_id})"></button>
        </div>`;
        
        //ADD Item to Localstorage for checking
        localStorage.setItem(`CartItem${_id}`, 1);
      }
    }
  })
}

//Remove cart item
function RemoveCartItem(id){
  const cartitem = document.getElementById(`CartItem${id}`);
  console.log(cartitem);
  cartitem.innerHTML = " ";
  localStorage.removeItem(`CartItem${id}`)
}

//Get products function
function GetProducts() {
  try {
    //See if json server is available
    let response =  fetch('http://localhost:3000/Products');
    const data =  response.json();
    // console.log("try", data);
    return data;

  } catch (error) {
    //Get from localstorage
    const data = JSON.parse(localStorage.getItem("Items"));
    // console.log("catch", data);
    return data;
  }
};

//Products filter 
function filter(list, _name, brands, storage, listbody) {
  //Removes the displayed Products 
  listbody.innerHTML = " ";
  //Filters from Product Name and its Variants 
  list.map((x) => {
    let Storages = [Object.keys(x.price).includes(storage[0]),Object.keys(x.price).includes(storage[1]),Object.keys(x.price).includes(storage[2]),Object.keys(x.price).includes(storage[3])];
    // TEST
    // console.log(x.name.toUpperCase().includes(_name.toUpperCase()));
    // console.log(x.brand.toUpperCase().includes(_name.toUpperCase()));
    // console.log([brand1, brand2].includes(x.brand));
    // console.log(Object.keys(x.price).map(y => [stor1, stor2, stor3].includes(y)).includes(true));
    if((x.name.toUpperCase().includes(_name.toUpperCase()) || x.brand.toUpperCase().includes(_name.toUpperCase()))
      && brands.includes(x.brand) 
      && (Storages.includes(true)))
      {
        //Displays the filtered product/s
        DisplayProduct(x, listbody);
      }
    });
}

//Go to Checkout
function CheckOut() {
  window.location.href = "../Checkout/Checkout.html";
}