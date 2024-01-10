window.addEventListener('load', () => {
    const inputFields = [
        { input: '.firstNameProfileInput', span: '.firstNameProfileSpan' },
        { input: '.lastNameProfileInput', span: '.lastNameProfileSpan' },
        { input: '.dniProfileInput', span: '.dniProfileSpan' },
        { input: '.actualPassProfileInput', span: '.actualPassProfileSpan' },
        { input: '.newPassProfileInput', span: '.newPassProfileSpan' },
        { input: '.checkNewPassProfileInput', span: '.checkNewPassProfileSpan' },
        { input: '.countryProfileInput', span: '.countryProfileSpan' },
        { input: '.stateProfileInput', span: '.stateProfileSpan' },
        { input: '.cityProfileInput', span: '.cityProfileSpan' },
        { input: '.cpProfileInput', span: '.cpProfileSpan' },
        { input: '.streetProfileInput', span: '.streetProfileSpan' },
        { input: '.streetNumberProfileInput', span: '.streetNumberProfileSpan' }
    ];

    inputFields.forEach(({ input, span }) => {
        const inputElement = document.querySelector(input);
        const spanElement = document.querySelector(span);

        inputElement.addEventListener('blur', () => {
            if (inputElement.value === "") {
                spanElement.style.display = 'block';
                inputElement.style.border = "2px solid red";
            } else {
                spanElement.style.display = 'none';
                inputElement.style.border = "2px solid green";
            }
        });
    });
});