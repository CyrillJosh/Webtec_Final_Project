document.addEventListener("DOMContentLoaded", () => {
    fetch("Data/Data.json")
    .then(rawData => rawData.json())
    .then(products => {
        const tbody = document.getElementById("Table-Body")
        products.forEach(element => {
            tbody.innerHTML += element;
        });
    })
})