window.addEventListener('load', () => {

    const emailInput = document.querySelector('#email')
    const passwordInput = document.querySelector('#password')
    const emailSpan = document.querySelector('.emailSpan')
    const passSpan = document.querySelector('.passSpan')

    emailInput.focus()

    emailInput.addEventListener('input', () => {

        var validEmail =  /^[\w\.-]+@[\w\.-]+\.\w{2,}$/

        if(validEmail.test(emailInput.value)) {
            emailSpan.style.display = 'none'
            emailInput.style.border = "2px solid green"
        }else {
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

})