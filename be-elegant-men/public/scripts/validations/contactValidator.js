window.addEventListener('load', () => {

    const userInput = document.querySelector('#user')
    const detailInput = document.querySelector('#detail')

    const userSpan = document.querySelector('.userSpan')
    const detailSpan = document.querySelector('.detailSpan')

    userInput.addEventListener('blur', () => {

        var emailValido =  /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;

        if( emailValido.test(userInput.value)){
            userSpan.style.display = 'none'
        }else{
            userSpan.style.display = 'block'
            userInput.style.border = "2px solid red";
        }
    });

    detailInput.addEventListener('blur', () => {
        if (detailInput.value == "") {
            detailSpan.style.display = 'block' 
            detailInput.style.border = "2px solid red";
        } else {
            detailSpan.style.display = 'none' 
        }
    })
});