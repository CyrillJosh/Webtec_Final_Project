document.addEventListener("DOMContentLoaded", () => {

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

    //Display to cart
    const cart = document.getElementById("Cart");
    cartitems = localStorage.getItem("cartitems");
    cartitems = JSON.parse(cartitems);
    let prods = GetProducts();
    let total = 0;
    cart.innerHTML = "";
    //No products in the cart
    if(localStorage["cartitems"]==null){
        cart.innerHTML += 
        `<li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h4>No Products added to cart</h4>
            </div>
        </li>`
    }
    //displays each product in the cart
    else{
        Array.from(cartitems).forEach( item => {
            let prod = prods.filter(x => x.id == item.id)[0];
            cart.innerHTML += 
            `<li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
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
                <div>
                    <p class="text-body-secondary col-12">₱${prod.price[`${item.storage}`].toLocaleString()}</p>
                    <p class="col-12 text-end">x ${item.qty}</p>
                </div>
            </li>`

            total += (prod.price[`${item.storage}`] * item.qty);
        })
        //Display total
        cart.innerHTML += 
        `<li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h5 class="my-0">TOTAL:</h5>
            </div>
            <div>
                <p class="col-12 text-end">₱${total.toLocaleString()}</p>
            </div>
        </li>`;

        let badge = document.getElementById("badge");
        badge.innerHTML = cartitems.length;

    }

    let formCheckOut = document.getElementById("formCheckOut");
    formCheckOut.addEventListener("submit", (e) => {
        e.preventDefault();
        let cartitems = localStorage.getItem("cartitems");
        cartitems = JSON.parse(cartitems);
        let Items = localStorage.getItem("Items");
        Items = Array.from(JSON.parse(Items));
        if(cartitems == null){
            alert("Error\nNo products found");
        }
        else{
            if(!Object.keys(localStorage).includes("Orders")){
                localStorage.setItem("Orders",JSON.stringify([{id: 1, fname: formCheckOut.firstName.value, lname: formCheckOut.lastName.value, username: formCheckOut.username.value, email: formCheckOut.email.value, address: formCheckOut.address.value, items: cartitems}]))
            }
            else{
                let orders = localStorage.getItem("Orders")
                orders = Array.from(JSON.parse(orders));
                orders.push({id:(orders.length +1), fname: formCheckOut.firstName.value, lname: formCheckOut.lastName.value, username: formCheckOut.username.value, email: formCheckOut.email.value, address: formCheckOut.address.value, items: [cartitems]});
                localStorage.removeItem("Orders");
                localStorage.setItem("Orders",JSON.stringify(orders))
            }
            let updatedItems = Items.map(x => {
                let cartitem = cartitems.filter(item => item.id == x.id)[0]
                if(cartitem != undefined){
                    x.stock = x.stock - cartitem.qty;
                }
                return x;
            })
            localStorage.removeItem("Items");
            localStorage.setItem("Items", JSON.stringify(updatedItems));
            localStorage.removeItem("cartitems");
            alert(`Products will be delivered on ${formCheckOut.address.value} ${formCheckOut.address2.value}`);
        }
        location.reload();
    })
})

function GetProducts() {
    //Get from localstorage
    const data = JSON.parse(localStorage.getItem("Items"));
    return data;
};