document.addEventListener("DOMContentLoaded", function(event) { 

    const list = document.getElementById("list-container");

  let Items = GetProducts();
  // console.log("test",Items);
  Items.forEach(cell => {
    // console.log(cell);
    let id = cell["id"];
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
    
    list.innerHTML += `<a onclick="" class="col-sm-12 col-md-5 col-lg-4 col-xl-4 d-flex justify-content-center" style="text-decoration: none">
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
        <li><button onclick="AddToCart(${id})">test</button></li>
    </ul>
    </div>
    </div>
    </a>`
  });

})

function AddToCart(_id) {
  const cart = document.getElementById("CartBody");
  let Items = GetProducts();
  Items.forEach( item => {
    if (item["id"] == _id)
    {
      console.log(item);
      let image = item["variants"]["Base"]["image"];;
      let name = item["name"];
      cart.innerHTML+= `<div class = "col-12 d-flex align-items-center">
      <img src="${image}" style="Height: 100px; Width: 100px">
      <p class="h5">${name}</p>
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