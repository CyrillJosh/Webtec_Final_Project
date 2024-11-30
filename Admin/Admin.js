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

    //Add product
    document.getElementById("Add").addEventListener("click", () =>{
        DisplayAddNewProductForm(DisplayBody);
    });

    document.getElementById("Products").click();
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
        let total = 0;
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
                    <span class="text-body-secondary ms-3">₱${prod.price[`${item.storage}`].toLocaleString()}</span>
                    <span class="text-end">x ${item.qty}</span>
                </div>
            </li>`;
            total+=prod.price[item.storage];
        })
        itemHTML += 
        `<li class="card p-4">
            <div class="dropdown-item d-flex justify-content-between">
                <div>
                    <h5 class="my-0">TOTAL:</h5>
                </div>
                <div>
                    <p class="col-12 text-end">₱${total.toLocaleString()}</p>
                </div>
            </div>
        </li>`;
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
                    <ul class="dropdown-menu p-0 overflow-y-auto" style="Height: 244px">
                        ${itemHTML}
                    </ul>
                </div>
            </th>
        </tr>`
        ;
    })
}

//Display new product form
function DisplayAddNewProductForm(DisplayBody){
    DisplayBody.innerHTML = 
   ` <form class="h-100 row" id="FormAddProduct">
        <h5>Add new product</h5>
        <div class="col-lg-6">
            <input type="text" class="form-control my-3" placeholder="Name" id="name" required>
        </div>
        <div class="col-lg-6">
            <input type="text" class="form-control my-3" placeholder="Brand" id="brand" required>
        </div>
        <div class="col-lg-12">
            <input type="url" class="form-control my-3" placeholder="Image Link" id="image" required>
        </div>
        <div class="col-lg-3">
            <input type="number" class="form-control my-3" placeholder="Ram" id="ram" required>
        </div>
        <div class="col-lg-3">
            <input type="text" class="form-control my-3" placeholder="Operating System" id="os" required>
        </div>
        <div class="col-lg-3">
            <input type="number" class="form-control my-3" placeholder="Battery" id="battery" required>
        </div>
        <div class="col-lg-3">
            <input type="number" class="form-control my-3" placeholder="Stock" id="stock" required>
        </div>
        <div class="col-lg-12 d-flex justify-content-around">
            <div class="col-lg-4 pe-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h5>Price/s</h5>
                    <div>
                        <button class="btn" id="minPricebtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                            </svg>
                        </button>
                        <button class="btn" id="addPricebtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="Price" data-qty="1">

                </div>
            </div>
            <div class="col-lg-4 px-1">
                <div class="d-flex justify-content-between align-items-center">
                    <h5>Network/s</h5>
                    <div>
                        <button class="btn" id="minNetworkbtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                            </svg>
                        </button>
                        <button class="btn" id="addNetworkbtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="Network" data-qty="1">

                </div>
            </div>
            <div class="col-lg-4 ps-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h5>Color/s</h5>
                    <div>
                        <button class="btn" id="minColorbtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                            </svg>
                        </button>
                        <button class="btn" id="addColorbtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="Color" data-qty="1">
                        
                </div>
            </div>
        </div>
        <footer class="d-flex align-items-end justify-content-end">
            <input type="submit" value="Add" class="btn border">
        </footer>
    </form>`;
    
    //Get display container
    let formprice = document.getElementById("Price");
    let formnetwork = document.getElementById("Network");
    let formcolor = document.getElementById("Color");


    //Display 1 for each data
    for (let i = 1; i <= formprice.dataset.qty; i++){
        formprice.innerHTML += 
        `<div class="input-group">
            <input type="number" class="form-control my-3 storageinput" placeholder="Storage" id="storage${i}" required>
            <input type="number" class="form-control my-3 priceinput" placeholder="₱ Price" id="price${i}" required>
        </div>`;
    }

    for (let i = 1; i <= formnetwork.dataset.qty; i++){
        formnetwork.innerHTML += 
        `<input type="number" class="form-control my-3 networkinput" placeholder="Network" id="network${i}" required>`;
    }

    for (let i = 1; i <= formcolor.dataset.qty; i++){
        formcolor.innerHTML += 
        `<input type="text" class="form-control my-3 colorinput" placeholder="Color" id="Color${i}" required>`;
    }

    //Event listeners
    //Price
    document.getElementById("minPricebtn").addEventListener("click", (e) => {
        e.preventDefault();
        if(formprice.dataset.qty > 1){
            formprice.innerHTML =""
            formprice.setAttribute("data-qty", --formprice.dataset.qty);
            for (let i = 1; i <= formprice.dataset.qty; i++){
                formprice.innerHTML += 
                `<div class="input-group">
                    <input type="number" class="form-control my-3 storageinput" placeholder="Storage" id="storage${i}" required>
                    <input type="number" class="form-control my-3 priceinput" placeholder="₱ Price" id="price${i}" required>
                </div>`;
            }
        }
    })
    document.getElementById("addPricebtn").addEventListener("click", (e) => {
        e.preventDefault();
        formprice.innerHTML =""
        formprice.setAttribute("data-qty", ++formprice.dataset.qty);
            for (let i = 1; i <= formprice.dataset.qty; i++){
                formprice.innerHTML += 
                `<div class="input-group">
                    <input type="number" class="form-control my-3 storageinput" placeholder="Storage" id="storage${i}" required>
                    <input type="number" class="form-control my-3 priceinput" placeholder="₱ Price" id="price${i}" required>
                </div>`;
            }
    })

    //Network
    document.getElementById("minNetworkbtn").addEventListener("click", (e) => {
        e.preventDefault();
        if(formnetwork.dataset.qty > 1){
            formnetwork.innerHTML =""
            formnetwork.setAttribute("data-qty", --formnetwork.dataset.qty);
            for (let i = 1; i <= formnetwork.dataset.qty; i++){
                formnetwork.innerHTML += 
                `<input type="number" class="form-control my-3 networkinput" placeholder="Network" id="network${i}">`;
            }
        }
    })

    document.getElementById("addNetworkbtn").addEventListener("click", (e) => {
        e.preventDefault();
        formnetwork.innerHTML =""
        formnetwork.setAttribute("data-qty", ++formnetwork.dataset.qty);
            for (let i = 1; i <= formnetwork.dataset.qty; i++){
                formnetwork.innerHTML += 
                `<input type="number" class="form-control my-3 networkinput" placeholder="Network" id="network${i}">`;
            }
    })

    document.getElementById("minColorbtn").addEventListener("click", (e) => {
        e.preventDefault();
        e.preventDefault();
        if(formcolor.dataset.qty > 1){
            formcolor.innerHTML =""
            formcolor.setAttribute("data-qty", --formcolor.dataset.qty);
            for (let i = 1; i <= formcolor.dataset.qty; i++){
                formcolor.innerHTML += 
                `<input type="text" class="form-control my-3 colorinput" placeholder="Color" id="Color${i}">`;
            }
        }
    })

    document.getElementById("addColorbtn").addEventListener("click", (e) => {
        e.preventDefault();
        formcolor.innerHTML =""
        formcolor.setAttribute("data-qty", ++formcolor.dataset.qty);
            for (let i = 1; i <= formcolor.dataset.qty; i++){
                formcolor.innerHTML += 
                `<input type="text" class="form-control my-3 colorinput" placeholder="Color" id="Color${i}">`;
            }
    })

    document.getElementById("FormAddProduct").addEventListener("submit", (e) => {
        e.preventDefault();
        let storageinputs = document.getElementsByClassName("storageinput");
        let priceinputs = document.getElementsByClassName("priceinput");
        let objpricepergb = "";
            for (let i = 0; i < storageinputs.length; i++){
                if(i == 0){
                    objpricepergb += '{"'
                }
                objpricepergb += storageinputs[i].value + 'GB" : ' + priceinputs[i].value + ','
                if(i == storageinputs.length-1){
                    objpricepergb = objpricepergb.substring(0, objpricepergb.length-1);
                    objpricepergb += '}'
                }
            }

        let netwokrinputs = document.getElementsByClassName("networkinput");
        let objnetwork = []
        for (let i = 0; i < netwokrinputs.length; i++){
            objnetwork.push(netwokrinputs[i].value);
        }
        
        let colorinputs = document.getElementsByClassName("colorinput");
        let objcolor = [];
        for (let i = 0; i < colorinputs.length; i++){
            objcolor.push(colorinputs[i].value);
        }
        
        let items = GetProducts();
        let prod = {
            id: (items.length + 1),
            brand: document.getElementById("brand").value,
            name: document.getElementById("name").value,
            image: document.getElementById("image").value,
            price: JSON.parse(objpricepergb),
            specs: {
                network: JSON.parse(objnetwork),
                os: document.getElementById("os").value,
                battery: `${document.getElementById("battery").value} mAh`
            },
            ram: `${document.getElementById("ram").value}GB`,
            color: objcolor,
            stock : document.getElementById("stock").value
        }


        //TODO LIST
        // -Add prod to itemslist
        // -edit product
        // -remove product
        // -login page
    })
}

//Display edit product form
function EditProduct() {
    let btnEdit = document.getElementsByClassName("edit");
    Array.from(btnEdit).forEach(btn => {
        btn.addEventListener("click", ()=>{

        })
    })
}

//Remove a product
function RemoveProduct(){
    let btnRemove = document.getElementsByClassName("remove");
    Array.from(btnRemove).forEach(btn => {
        btn.addEventListener("click", ()=>{

        })
    })
}