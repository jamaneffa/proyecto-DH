window.addEventListener('load', () => {

    const firstNameInput = document.querySelector('#first_name')
    const lastNameInput = document.querySelector('#last_name')
    const dniInput = document.querySelector('#dni')
    const countryInput = document.querySelector('#country')
    const stateInput = document.querySelector('#state')
    const cityInput = document.querySelector('#city')
    const cpInput = document.querySelector('#cp')
    const streetInput = document.querySelector('#street')
    const streetNumberInput = document.querySelector('#street_number')
    const emailInput = document.querySelector('#email')
    const passwordInput = document.querySelector('#password')
    const rePasswordInput = document.querySelector('#repassword')

    firstNameInput.focus()

    const firstNameSpan = document.querySelector('.firstNameSpan')
    const lastNameSpan = document.querySelector('.lastNameSpan')
    const dniSpan = document.querySelector('.dniSpan')
    const countrySpan = document.querySelector('.countrySpan')
    const stateSpan = document.querySelector('.stateSpan')
    const citySpan = document.querySelector('.citySpan')
    const cpSpan = document.querySelector('.cpSpan')
    const streetSpan = document.querySelector('.streetSpan')
    const streetNumberSpan = document.querySelector('.streetNumberSpan')
    const emailSpan = document.querySelector('.emailSpan')
    const passSpan = document.querySelector('.passSpan')
    const rePassSpan = document.querySelector('.rePassSpan')

    firstNameInput.addEventListener('blur', () => {
        if (firstNameInput.value == "") {
            firstNameSpan.style.display = 'block'
            firstNameInput.style.border = "2px solid red"
        } else {
            firstNameSpan.style.display = 'none'
            firstNameInput.style.border = "2px solid green"
        }
    })

    lastNameInput.addEventListener('blur', () => {
        if (lastNameInput.value == "") {
            lastNameSpan.style.display = 'block'
            lastNameInput.style.border = "2px solid red"
        } else {
            lastNameSpan.style.display = 'none'
            lastNameInput.style.border = "2px solid green"
        }
    })

    dniInput.addEventListener('blur', () => {
        if (dniInput.value == "") {
            dniSpan.style.display = 'block'
            dniInput.style.border = "2px solid red"
        } else {
            dniSpan.style.display = 'none'
            dniInput.style.border = "2px solid green"
        }
    })

    countryInput.addEventListener('blur', () => {
        if (countryInput.value === "default") {
            countrySpan.style.display = 'block'
            countryInput.style.border = "2px solid red"
        } else {
            countrySpan.style.display = 'none'
            countryInput.style.border = "2px solid green"
        }
    })

    stateInput.addEventListener('blur', () => {
        if (stateInput.value == "") {
            stateSpan.style.display = 'block'
            stateInput.style.border = "2px solid red"
        } else {
            stateSpan.style.display = 'none'
            stateInput.style.border = "2px solid green"
        }
    })

    cityInput.addEventListener('blur', () => {
        if (cityInput.value == "") {
            citySpan.style.display = 'block'
            cityInput.style.border = "2px solid red"
        } else {
            citySpan.style.display = 'none'
            cityInput.style.border = "2px solid green"
        }
    })

    cpInput.addEventListener('blur', () => {
        if (cpInput.value == "") {
            cpSpan.style.display = 'block'
            cpInput.style.border = "2px solid red"
        } else {
            cpSpan.style.display = 'none'
            cpInput.style.border = "2px solid green"
        }
    })

    streetInput.addEventListener('blur', () => {
        if (streetInput.value == "") {
            streetSpan.style.display = 'block'
            streetInput.style.border = "2px solid red"
        } else {
            streetSpan.style.display = 'none'
            streetInput.style.border = "2px solid green"
        }
    })

    streetNumberInput.addEventListener('blur', () => {
        if (streetNumberInput.value == "") {
            streetNumberSpan.style.display = 'block'
            streetNumberInput.style.border = "2px solid red"
        } else {
            streetNumberSpan.style.display = 'none'
            streetNumberInput.style.border = "2px solid green"
        }
    })


    emailInput.addEventListener('input', () => {

        var validEmail =  /^[\w\.-]+@[\w\.-]+\.\w{2,}$/

        if( validEmail.test(emailInput.value) ){
            emailSpan.style.display = 'none'
            emailInput.style.border = "2px solid green"
        }else{
            emailSpan.style.display = 'block'
            emailInput.style.border = "2px solid red"
        }

    })

    passwordInput.addEventListener('blur', () => {
        if (passwordInput.value == "") {
            passSpan.style.display = 'block'
            passwordInput.style.border = "2px solid red"
        } else {
            passSpan.style.display = 'none'
            passwordInput.style.border = "2px solid green"
        }
    })

    rePasswordInput.addEventListener('blur', () => {
        if (rePasswordInput.value == "") {
            rePassSpan.style.display = 'block'
            rePasswordInput.style.border = "2px solid red"
        } else {
            rePassSpan.style.display = 'none'
            rePasswordInput.style.border = "2px solid green"
        }
    })
    
})