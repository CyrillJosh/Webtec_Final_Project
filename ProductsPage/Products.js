document.addEventListener("DOMContentLoaded", function(event) { 
  
  //Get the form
  const FormFilter = document.getElementById("FormFilter");
  
  //Get the buttons
  const Home = document.getElementById("Home");
  const Products = document.getElementById("Products");

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

  //Filter Products
  FormFilter.addEventListener("submit", (e) => {
    //Disables changing of url or reloading of page
    e.preventDefault();
    //Initialization
    let brand1 = FormFilter.iPhone.checked ? FormFilter.iPhone.value : "" ;
    let brand2 = FormFilter.Samsung.checked ? FormFilter.Samsung.value : "" ;
    let search = FormFilter.Search.value;
    //Displays the filtered Products
    filter(Items, search, brand1, brand2, list);
  })

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

  //ReDisplay saved CartProducts
  let cartitems = Object.keys(localStorage).filter(x => x.includes("CartItem")).map(x=> x[x.length-1]);
  cartitems.forEach(item_id => {
    AddToCart(item_id, true)
  })
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
    let variant = cell["variants"];
    let dvariant = ""

    //displays each variant
    for(let vr in variant){
        dvariant += vr + "/"
    }
    //Removes the last "/"
    dvariant = dvariant.substring(0, (dvariant.length -1));

    //Gets the base variant for display
    let base = variant["Base"];
    let image = base["image"];
    let gb = base["price"];
    let dgb = "";

    //displays each storage(GB) available
    for(let _gb in gb){
      dgb += _gb + "/";
    } 
    //Removes the last "/"
    dgb = dgb.substring(0, (dgb.length -1));

    //displays each Color available
    let colors = "";
    base["color"].forEach(item => {
      colors += item + "/";
    });
    //Removes the last "/"
    colors = colors.substring(0, (colors.length -1));
    
    //Display the products
    DisplayList.innerHTML += `
    <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center border rounded">
      <div class="p-3 w-100 h-100">
        <img src="${image}" class="card-img-top object-fit-contain m-3" alt="..." Height="175rem">
        <div class="card-body">
          <hr class="m-0 mb-2 w-100" style="margin-top: -50rem">
          <h5 class="card-title">${name}</h5>
          <ul>
              <li>${brand}</li>
              <li>${dvariant}</li>
              <li>${dgb}</li>
              <li>${colors}</li>
          </ul>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalscreen-${id}">
            Add to Cart
          </button>
          <div class="modal fade" id="modalscreen-${id}" tabindex="-1" aria-labelledby="exampleModalFullscreenLabel" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-4" id="exampleModalFullscreenLabel">Add to Cart</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class = "col-lg-6 col-sm-12 p-5">
                      <img src="${image}" class="object-fit-contain">
                    </div>
                    <div class = "col-lg-6 col-sm-12">
                      <form id="Prod${id}">
                        test
                      </form>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" onclick="AddToCart(${id}, false)" class="btn btn-secondary" data-bs-dismiss="modal">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

//Add to cart function
function AddToCart(_id, skip) {
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
        <div class="row align-items-center">
          <div class="p-2 border m-2 col-2"style="Height: 75px; Width: 75px"><img src="${image}" class="h-100 w-100 object-fit-scale"></div>
            <p class="h5 col-3">${name}</p>
            <p class="h5 col-3">x${amount}</p>
            <button type="button" class="btn-close col-1 offset-1" onclick="RemoveCartItem(${_id})"></button>
          </div>`
      }
      else {
        console.log("not exists");
        cart.innerHTML+= `<div class = "col-12" id="CartItem${_id}">
        <div class="row align-items-center">
          <div class="p-2 border m-2 col-2"style="Height: 75px; Width: 75px"><img src="${image}" class="h-100 w-100 object-fit-scale"></div>
            <p class="h5 col-3">${name}</p>
            <p class="h5 col-3">x1</p>
            <button type="button" class="btn-close col-1 offset-1" onclick="RemoveCartItem(${_id})"></button>
          </div>
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
    const response =  fetch('http://localhost:3000/Products');
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
function filter(list, _name, brand1, brand2, listbody) {
  //Removes the displayed Products 
  listbody.innerHTML = " ";
  //Filters from Product Name and its Variants 
  list.map((x) => {
    if((x["name"].toUpperCase().includes(_name.toUpperCase()) || Object.keys(x["variants"]).map(y => y.toUpperCase()).includes(_name.toUpperCase()))
      && [brand1, brand2].includes(x["brand"]))
      {
        //console.log(brand1,brand2)
        console.log([brand1,brand2] == ["",""]);

        //Displays the filtered product/s
        DisplayProduct(x, listbody);
      }
    });
}