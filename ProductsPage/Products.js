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
  console.log(id);
  console.log(brand);
  console.log(name);
  console.log(variant);
  console.log(base);
  console.log(image)
  console.log(price);
  
  list.innerHTML += `<div class="card m-2" style="width: 18rem;">
  <img src="${image}" class="card-img-top" alt="..." Height="175rem">
  <div class="card-body">
  <h5 class="card-title">${name}</h5>
  <ul>
      <li>${brand}</li>
      <li>${dvariant}</li>
      <li>${dprice}</li>
  </ul>
  </div>
  </div>`
  
});
