document.addEventListener("DOMContentLoaded", () => {
    fetch("../Data/Data.json")
    .then(rawData => rawData.json())
    .then(products => {
        const tbody = document.getElementById("Table-Body")
        products["Products"].forEach(cell => {
            //console.log(cell);
            let id = cell["id"];
            let brand = cell["brand"];
            let name = cell["name"];
            let variant = cell["variants"];
            // console.log(variant);
            let count = 0;
            for(let vr in variant ) {
                let model = variant[vr];
                let dname = name + " ";
                if (Object.keys(variant)[count] != "Base"){
                    dname += Object.keys(variant)[count];
                }
                let dhtml = 
                `<tr>
                    <td>${dname}</td>
                    <td>${brand}</td>
                    <td>${model["stock"]}</td>
                </tr> `
                tbody.innerHTML += dhtml;
                count++;
            };
            // let image = base["image"];
        });
    })
})