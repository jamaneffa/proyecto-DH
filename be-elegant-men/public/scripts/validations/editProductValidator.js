window.addEventListener('load', () => {

    const nameInput = document.querySelector('#name')
    const descriptionInput = document.querySelector('#description')
    const priceInput = document.querySelector('#price')
    const discountInput = document.querySelector('#discount')
    const stockInput = document.querySelector('#stock')
    const brandInput = document.querySelector('#brand')
    const categoryInput = document.querySelector('#category')

    const nameSpan = document.querySelector('.nameSpan')
    const descriptionSpan = document.querySelector('.descriptionSpan')
    const priceSpan = document.querySelector('.priceSpan')
    const discountSpan = document.querySelector('.discountSpan')
    const stockSpan = document.querySelector('.stockSpan')
    const brandSpan = document.querySelector('.brandSpan')
    const categorySpan = document.querySelector('.categorySpan')

    nameInput.addEventListener('blur', () => {
        if (nameInput.value == "") {
            nameSpan.style.display = 'block' 
            nameInput.style.border = "2px solid red"
        } else {
            nameSpan.style.display = 'none' 
            nameInput.style.border = "2px solid green"
        }
    })

    descriptionInput.addEventListener('blur', () => {
        if (descriptionInput.value == "") {
            descriptionSpan.style.display = 'block' 
            descriptionInput.style.border = "2px solid red"
        } else {
            descriptionSpan.style.display = 'none' 
            descriptionInput.style.border = "2px solid green"
        }
    })

    priceInput.addEventListener('blur', () => {
        if (priceInput.value == "") {
            priceSpan.style.display = 'block' 
            priceInput.style.border = "2px solid red"
        } else {
            priceSpan.style.display = 'none' 
            priceInput.style.border = "2px solid green"
        }
    })

    discountInput.addEventListener('blur', () => {
        if (discountInput.value == "") {
            discountSpan.style.display = 'block' 
            discountInput.style.border = "2px solid red"
        } else {
            discountSpan.style.display = 'none' 
            discountInput.style.border = "2px solid green"
        }
    })

    stockInput.addEventListener('blur', () => {
        if (stockInput.value == "") {
            stockSpan.style.display = 'block' 
            stockInput.style.border = "2px solid red"
        } else {
            stockSpan.style.display = 'none' 
            stockInput.style.border = "2px solid green"
        }
    })

    brandInput.addEventListener('blur', () => {
        if (brandInput.value == "default") {
            brandSpan.style.display = 'block' 
            brandInput.style.border = "2px solid red";
        } else {
            brandSpan.style.display = 'none' 
            brandInput.style.border = "2px solid green";
        }
    });

    categoryInput.addEventListener('blur', () => {
        if (categoryInput.value == "default") {
            categorySpan.style.display = 'block' 
            categoryInput.style.border = "2px solid red";
        } else {
            categorySpan.style.display = 'none' 
            categoryInput.style.border = "2px solid green";
        }
    });

})