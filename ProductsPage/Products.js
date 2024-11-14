document.addEventListener("DOMContentLoaded", function(event) { 
  
  const FormSearch = document.getElementById("Search");
  const Home = document.getElementById("Home");
  const Products = document.getElementById("Products");
  const list = document.getElementById("list-container");
  let Items = GetProducts();
  
  FormSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    filter(Items, FormSearch.Search.value, list)
  })

  Products.addEventListener("click", () => {
    window.location.href = "../ProductsPage/Products.html";
    // this.location.replace("ProductsPage/Products.html")
  })
  Home.addEventListener("click", () => {
    window.location.href = "../index.html";
    // this.location.replace("index.html")
  })

  // console.log("test",Items);
  Items.forEach(cell => {
    // console.log(cell);
    let brand = cell["brand"];
    let name = cell["name"];
    let variant = cell["variants"];
    let dvariant = ""
    for(let vr in variant){
      dvariant += vr + "/"
    }
    dvariant = dvariant.substring(0, (dvariant.length -1));
    let base = variant["Base"];
    let image = base["image"];
    let gb = base["price"];
    let dgb = "";
    for(let _gb in gb){
      dgb += _gb + "/";
    } 
    dgb = dgb.substring(0, (dgb.length -1));

    let colors = "";
    base["color"].forEach(item => {
      colors += item + "/";
    });
    colors = colors.substring(0, (colors.length -1));

    // console.log(id);
    // console.log(brand);
    // console.log(name);
    // console.log(variant);
    // console.log(base);
    // console.log(image)
    // console.log(price);
    
    list.innerHTML += `<div onclick="" class="col-sm-12 col-md-5 col-lg-4 col-xl-4 d-flex justify-content-center">
    <div class="card m-0 p-2" style="width: 100%;">
      <img src="${image}" class="card-img-top object-fit-contain" alt="..." Height="175rem">
      <div class="card-body">
      <hr class="m-0 mb-2 w-100" style="margin-top: -50rem">
      <h5 class="card-title">${name}</h5>
      <ul>
          <li>${brand}</li>
          <li>${dvariant}</li>
          <li>${dgb}</li>
          <li>${colors}</li>
      </ul>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen">
        Add to Cart
      </button>
      <div class="modal fade" id="exampleModalFullscreen" tabindex="-1" aria-labelledby="exampleModalFullscreenLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-4" id="exampleModalFullscreenLabel">${name}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>`
  });

})

function AddToCart(_id) {
  const cart = document.getElementById("CartBody");
  let Items = GetProducts();
  Items.forEach( item => {
    if (item["id"] == _id)
    {
      // console.log(item);
      let image = item["variants"]["Base"]["image"];;
      let name = item["name"];
      cart.innerHTML+= `<div class = "col-12">
      <div class="row align-items-center">
      <div class="p-2 border m-2 col-2"style="Height: 75px; Width: 75px"><img src="${image}" class="h-100 w-100 object-fit-scale"></div>
      <p class="h5 col-6">${name}</p>
      <button type="button" class="btn-close col-1 offset-1" aria-label="Close"></button>
      </div>
      </div>`;
    }
  })
}

function GetProducts() {
  try {
    //See if json server is available
    const response =  fetch('http://localhost:3000/Products');
    const data =  response.json();
    // console.log("try", data);
    return data;

  } catch (error) {
    //Get localstorage
    const data = JSON.parse(localStorage.getItem("Items"));
    // console.log("catch", data);
    return data;
  }
};

function filter(list, _name, listbody) {
  listbody.innerHTML = "";
  list.forEach(cell => {
    console.log(Object.keys(cell["variants"]).map(x => x.toUpperCase()), _name.toUpperCase());
    if(cell["name"].toUpperCase().includes(_name.toUpperCase()) || Object.keys(cell["variants"]).map(x => x.toUpperCase()).includes(_name.toUpperCase()))
    {
      let brand = cell["brand"];
      let name = cell["name"];
      let variant = cell["variants"];
      let dvariant = ""
      for(let vr in variant){
        dvariant += vr + "/"
      }
      dvariant = dvariant.substring(0, (dvariant.length -1));
      let base = variant["Base"];
      let image = base["image"];
      let price = base["price"];
      let dprice = "";
      for(let gb in price){
        dprice += gb + "/";
      } 
      dprice = dprice.substring(0, (dprice.length -1));

      let colors = "";
      base["color"].forEach(item => {
        colors += item + "/";
      });
      colors = colors.substring(0, (colors.length -1));

      // console.log(id);
      // console.log(brand);
      // console.log(name);
      // console.log(variant);
      // console.log(base);
      // console.log(image)
      // console.log(price);
      
      listbody.innerHTML += `<div onclick="" class="col-sm-12 col-md-5 col-lg-4 col-xl-4 d-flex justify-content-center">
      <div class="card m-0 p-2" style="width: 100%;">
        <img src="${image}" class="card-img-top object-fit-contain" alt="..." Height="175rem">
        <div class="card-body">
        <hr class="m-0 mb-2 w-100" style="margin-top: -50rem">
        <h5 class="card-title">${name}</h5>
        <ul>
            <li>${brand}</li>
            <li>${dvariant}</li>
            <li>${dprice}</li>
            <li>${colors}</li>
        </ul>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen">
          Add to Cart
        </button>
        <div class="modal fade" id="exampleModalFullscreen" tabindex="-1" aria-labelledby="exampleModalFullscreenLabel" style="display: none;" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-4" id="exampleModalFullscreenLabel">Full screen modal</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>`
    }
  });
}