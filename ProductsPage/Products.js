document.addEventListener("DOMContentLoaded", function(event) { 
  
  //Go to Products page
  document.getElementById("Products").addEventListener("click", () => {
    window.location.href = "../ProductsPage/Products.html";
    // this.location.replace("ProductsPage/Products.html")
  })
  
  //Go to Homepage
  document.getElementById("Home").addEventListener("click", () => {
    window.location.href = "../index.html";
    // this.location.replace("../index.html")
  })
  
  //Go to Checkout
  document.getElementById("CheckOut").addEventListener("click", () => {
    window.location.href = "../Checkout/Checkout.html";
  })
  
  //Get the list container
  const list = document.getElementById("list-container");
  
  //Get the Products
  let Items = GetProducts();
  
  //Get the form
  const FormFilter = document.getElementById("FormFilter");

  FormFilter.addEventListener("reset", (e) => {
    //Redisplays products
    e.preventDefault();
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
  
  //display cart items on load
  if(Object.keys(localStorage).includes("cartitems")){
    let cartItems = localStorage.getItem("cartitems");
    cartItems = Array.from(JSON.parse(cartItems));
    DisplayToCart(cartItems);
  }

  //Add to cart
  const FormCheckout = document.getElementById("FormCheckout");
    FormCheckout.addEventListener("submit", (e) => {
      //disables default
      e.preventDefault();
      
      //Get data
      let fid = FormCheckout.dataset.id;
      const formData = new FormData(FormCheckout);
      let fcolor = formData.get('modal-color');
      let fstorage = formData.get('modal-storage');
      let fnetwork = formData.get('modal-network');
      
      //Check for existing cartitems
      if (Object.keys(localStorage).includes("cartitems"))
      {
        let cartitems = localStorage.getItem("cartitems");
        cartitems = Array.from(JSON.parse(cartitems))
        cartitems.push({id: fid, color: fcolor, storage: fstorage, network: fnetwork, qty: 1});
        localStorage.removeItem("cartitems");
        localStorage.setItem("cartitems",JSON.stringify(cartitems));
        DisplayToCart(cartitems);
      }
      //Add new cartitems
      else
      {
        let cartitems = [{id: fid, color: fcolor, storage: fstorage, network: fnetwork, qty: 1}];
        localStorage.setItem("cartitems",JSON.stringify(cartitems));
        console.log(JSON.stringify(cartitems));

        DisplayToCart(cartitems);
      }

      //Closes the modal
      let close = document.getElementById("CloseModal");
      close.click();
    });
})


//
//FUNCTIONS
//

//Display a product Function
function DisplayProduct(cell, DisplayList) {
  //NOTE: "d" stands for display
  //Check for product
  if (cell == null){
    console.log("Product not found"); 
    return;
  }
  else{
    console.log("Loading Product");
    
    //Initialization
    let id = cell["id"];
    let brand = cell["brand"];
    let name = cell["name"];
    let image = cell["image"];

    let prices = cell["price"];
    let dgb = "";

    //displays each storage(GB) available
    for (let prc in prices){
      dgb += prc + "/";
    };
    //Removes the last "/"
    dgb = dgb.substring(0, (dgb.length -1));


    //displays each Color available
    let colors = "";
    cell["color"].forEach(item => {
      colors += item + "/";
    });
    //Removes the last "/"
    colors = colors.substring(0, (colors.length -1));
    
    //Display the products
    DisplayList.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3 d-flex justify-content-center border rounded">
      <div class="p-3 w-100 h-100 d-flex flex-wrap justify-content-between">
      <div class="card-body">
      <img src="${image}" class="card-img-top object-fit-contain m-3" alt="${name}" Height="100rem">
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
    //Displays details on modal
    AddToCartModal();
  } 
}

//Display details on modal
function AddToCartModal(){
  Items = GetProducts();
  const btnCart = document.getElementsByClassName("AddtoCart");
  Array.from(btnCart).forEach(element => {
    element.addEventListener("click", ()=> {
      // console.log(element);
      let id = element.dataset.id;
      const form = document.getElementById("FormCheckout");
      form.setAttribute("data-id", id);
      //get Product by id
      let modal = Items.filter(x => x.id == id)[0];
  
      //Display into modal
      //Title and name  
      let title = Array.from(document.getElementsByClassName("name"));
      title.forEach(x => {
        x.innerHTML = modal.name;
      })
  
      //Image
      let img = document.getElementById("modalimg");
      img.src=modal["image"];
  
      //Color
      let color = document.getElementById("modal-color");
      let colorHTML = ""
      modal.color.forEach(x => {
        colorHTML += `
        <li class="list-inline-item">
          <input type="radio" value="${x}" name="modal-color" id="${x}${id}" required> 
          <label for="${x}${id}">${x}</label>
        </li>
        `;
      })
      color.innerHTML = colorHTML;
  
      //Storage
      let storage = document.getElementById("modal-storage");
      let storageHTML = "";
      for (let x in modal.price){
        storageHTML += `
        <li class="list-inline-item">
        <input type="radio" value="${x}" name="modal-storage" id="${x}${id}" required> 
        <label for="${x}${id}">${x}</label>
        <label for="${x}${id}"><span class="card px-3 ms-2 border-info text-info">₱${modal.price[x].toLocaleString()}<span></label>
        </li>
        `;
      }
      storage.innerHTML = storageHTML;
  
      //Network
      let network = document.getElementById("modal-network");
      let networkHTML = ""
      modal.specs.network.forEach(x => {
        networkHTML += `
        <li class="list-inline-item">
          <input type="radio" value="${x}" name="modal-network" id="${x}${id}" required> 
          <label for="${x}${id}">${x}</label>
        </li>
        `;
      })
      network.innerHTML = networkHTML;
    })
  })
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


//Add to cart function
function DisplayToCart(items) {
  //Get Cart body
  const cart = document.getElementById("CartBody");
  cart.innerHTML = "";
  if(items == null) return;
  //Get products
  let prods = GetProducts();
  //reduce
  let reduced;
  console.log(items == null ? "Products not found": "Displaying Cart");
  //Nothing to reduce
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
  //reset cart items
  localStorage.removeItem("cartitems");
  localStorage.setItem("cartitems", JSON.stringify(reduced));
  //Display item into the cart modal
  reduced.forEach(cartitem => {
    let prod = prods.filter(x => x.id == cartitem.id)[0];
    cart.innerHTML += 
    `<div class="col-12 d-flex justify-content-between align-items-center px-2 py-4 border my-2 rounded-3">
      <img src="${prod.image}" alt="${prod.name}" Height="75rem" Width="100px" class="object-fit-scale ms-2">
      <div class="w-100 ps-5">
        <h3 class="text-start">${prod.name}</h3>
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
        <h4>₱${prod.price[`${cartitem.storage}`].toLocaleString()}</h4>
        <h5>x${cartitem.qty}</h5>
        </div>
      </div>
      <button type="button" class="btn-close removefromcart me-3" data-id="${cartitem.id}" data-color="${cartitem.color}" data-storage="${cartitem.storage}" data-network="${cartitem.network}"></button>
    </div>`
    ;
  })
  //Refresh RemoveItem function
  RemoveItem()
}

//Get products function
function GetProducts() {
  //Get from localstorage
  const data = JSON.parse(localStorage.getItem("Items"));
  return data;
};

//Products filter 
function filter(list, _name, brands, storage, listbody) {
  //Removes the displayed Products 
  listbody.innerHTML = " ";
  //Filters from Product Name, storage, and brand
  let filtered = list.map((x) => {
    let Storages = [Object.keys(x.price).includes(storage[0]),Object.keys(x.price).includes(storage[1]),Object.keys(x.price).includes(storage[2]),Object.keys(x.price).includes(storage[3])];
    if((x.name.toUpperCase().includes(_name.toUpperCase()) || x.brand.toUpperCase().includes(_name.toUpperCase()))
      && brands.includes(x.brand)
    && Storages.includes(true))
    {
      return x;
    }
  }).filter(x => x != undefined);
  
  console.log("Filtering products");
  //No products found
  if(filtered.length == 0){
    listbody.innerHTML = `<h1 class="text-center">NO PRODUCTS FOUND :(</h1>`;
    return;
  }
  //Displaying filtered products
  filtered.forEach(prod => {
    DisplayProduct(prod, listbody);
  })
}

//Go to Checkout
function CheckOut() {
  window.location.href = "../Checkout/Checkout.html";
}