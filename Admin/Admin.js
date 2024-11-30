document.addEventListener("DOMContentLoaded", () => {

    let DisplayBody = document.getElementById("DisplayBody");
    //Orders
    document.getElementById("Orders").addEventListener("click", () =>{
        DisplayOrders(DisplayBody)
    });

    //Products
    document.getElementById("Products").addEventListener("click", () => {
        DisplayProducts(DisplayBody);
    });
    
    //View Live
    document.getElementById("ViewLive").addEventListener("click", () => {
        window.open("../ProductsPage/Products.html")
    });
})

//get products
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

//Display Products
function DisplayProducts(DisplayBody) {
    let products = GetProducts();
    document.getElementById("Add").setAttribute("style","display:block");
    DisplayBody.innerHTML="";
    DisplayBody.innerHTML += 
    `<table class="table table-bordered table-hover">
        <thead>
            <tr class="table-info text-center sticky-top">
                <th>ID</th>
                <th>Brand</th>
                <th>Name</th>
                <th>Price</th>
                <th>stock</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody class="table-group-divider" id="Table-Body">
            
        </tbody>
    </table>`;
    const tbody = document.getElementById("Table-Body")
    products.forEach(cell => {
        let id = cell["id"];
        let brand = cell["brand"];
        let name = cell["name"];
        let price = cell["price"];
        let stock = cell["stock"];
        let dhtml = 
            `<tr>
                <td class="text-center">${id}</td>
                <td>${brand}</td>
                <td>${name}</td>
                <td>₱${Object.values(price)[0].toLocaleString()}</td>
                <td class="text-center">${stock}</td>
                <td class="d-flex justify-content-center">
                    <div class="dropdown">
                        <button class="btn d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item edit" data-id="${id}">Edit</button></li>
                            <li><button class="dropdown-item remove" data-id="${id}">Remove</button></li>
                        </ul>
                    </div>
                </td>
            </tr> `;
        tbody.innerHTML += dhtml;
        EditProduct();
        RemoveProduct();
    });
}

//Display orders
function DisplayOrders(DisplayBody) {
    document.getElementById("Add").setAttribute("style","display:none");
    DisplayBody.innerHTML=""
    DisplayBody.innerHTML += 
    `<table class="table table-bordered table-hover">
        <thead>
            <tr class="table-info text-center sticky-top">
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Items</th>
            </tr>
        </thead>
        <tbody class="table-group-divider" id="Table-Body">
            
        </tbody>
    </table>`;
    let tablebody = document.getElementById("Table-Body");
    let orders = localStorage.getItem("Orders")
    let prods = GetProducts();
    orders = JSON.parse(orders);
    orders.forEach(order => {
        let itemHTML ="";
        order.items[0].forEach(item => {
            let prod = prods.filter(x =>{
                if(x.id == item.id){
                    return x;
                }
            })[0];
            itemHTML += 
            `<li class="card p-4">
                <div class="dropdown-item d-flex align-items-center">
                    <img src="${prod["image"]}" height="50rem" class="me-2">
                    <h5 class="my-0">${prod.name}</h5>
                    <small class="text-body-secondary">
                        <ul>
                            <li>
                                <b>Color</b>: ${item.color}
                            </li>
                            <li>
                                <b>Storage:</b> ${item.storage}
                            </li>
                            <li>
                                <b>Network:</b> ${item.network}
                            </li>
                        </ul>
                    </small>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="text-body-secondary ms-3">₱${prod.price[`${item.storage}`]}</span>
                    <span class="text-end">x ${item.qty}</span>
                </div>
            </li>`;
        })
        tablebody.innerHTML += 
        `<tr>
            <th class="text-center">${order.id}</th>
            <th>${order.fname}</th>
            <th>${order.lname}</th>
            <th>${order.email}</th>
            <th>${order.username}</th>
            <th>
                <div class="dropdown">
                    <button class="btn d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </button>
                    <ul class="dropdown-menu p-0">
                        ${itemHTML}
                    </ul>
                </div>
            </th>
        </tr>`
        ;
    })
}

//Display new product form
function DisplayAddNewProduct(){

}

//Display edit product form
function EditProduct() {
    let btnEdit = document.getElementsByClassName("edit");
    Array.from(btnEdit).forEach(btn => {
        btn.addEventListener("click", ()=>{
            alert(btn.dataset.id);
        })
    })
}

//Remove a product
function RemoveProduct(){
    let btnRemove = document.getElementsByClassName("remove");
    Array.from(btnRemove).forEach(btn => {
        btn.addEventListener("click", ()=>{
            alert(btn.dataset.id);
        })
    })
}