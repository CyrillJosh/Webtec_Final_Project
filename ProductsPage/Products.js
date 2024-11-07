const list = document.getElementById("list-container");


let Items = JSON.parse(localStorage.getItem("Items"));
//console.log(Items);
Items.forEach(cell => {
  console.log(cell);
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

  console.log(id);
  console.log(brand);
  console.log(name);
  console.log(variant);
  console.log(base);
  console.log(image)
  console.log(price);
  
  list.innerHTML += `<a class="col-sm-12 col-md-5 col-lg-4 col-xl-3 d-flex justify-content-center" style="text-decoration: none">
  <div class="card m-0 p-0" style="width: 100%;">
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
  </div>
  </div>
  </a>`
});
