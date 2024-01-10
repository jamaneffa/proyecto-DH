window.addEventListener('load', () => {
    var sizeSelect = document.getElementById("size");
    var stockSelect = document.getElementById("stock");
    var stockLabel = document.getElementById('stockLabel')
    
    stockSelect.style.display = "none";

    let productData;

    const sku = document.getElementById('productSku').value;

    fetch(`http://localhost:3030/api/products/stock/${sku}`)
        .then(response => response.json())
        .then(data => {
            productData = data.product.stock;
        })
        .catch(error => {
            console.error("Error al obtener el stock:", error);
        });

    sizeSelect.addEventListener('change', () => {

        var selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        var selectedContent = selectedOption.text;

        stockSelect.style.display = "block";
        stockSelect.innerHTML = "";

        console.log("Talle seleccionado: ", selectedContent);

        if (productData && productData.length > 0) {
            let sizeStock = 0;

            for (let i = 0; i < productData.length; i++) {
                if (productData[i].size === selectedContent.toString()) {
                    sizeStock = productData[i].stock;
                    break;
                }
            }

            if (sizeStock > 0) {
                stockLabel.innerText = "Stock";
                for (let j = 1; j <= sizeStock; j++) {
                    var option = document.createElement("option");
                    option.value = j;
                    option.textContent = j.toString();
                    stockSelect.appendChild(option);
                }
            } else {
                stockSelect.style.display = "none";
                stockLabel.innerText = "No hay Stock en este talle";
            }
        } else {
            stockSelect.style.display = "none";
            stockLabel.innerText = "No hay Stock en este talle";
        }
    });
});




