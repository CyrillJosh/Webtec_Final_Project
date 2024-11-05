const list = document.getElementById("list-container");


let Items = JSON.parse(localStorage.getItem("Items"));
console.log(Items);
Items.forEach(cell => {
  let id = cell["id"];
  let brand = cell["brand"];
  let name = cell["name"];
  let variant = cell["variants"][0];
  let image = variant["image"];
  let price = Object.keys(variant["price"])[0];
  console.log(price);
  console.log(id);
  console.log(brand);
  console.log(name);
  console.log(variant);
  console.log(image)
  
  list.innerHTML += `<div class="card m-2" style="width: 18rem;">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">${name}</h5>
  <ul>
      <li>${brand}</li>
      <li>${price}</li>
  </ul>
  </div>
  </div>`
  
});
