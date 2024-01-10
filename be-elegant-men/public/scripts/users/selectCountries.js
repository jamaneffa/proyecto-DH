window.addEventListener('load', () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {

            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

            const select = document.getElementById('country');
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                select.appendChild(option);
            });
        })
        .catch( error => 
            console.error('Error al obtener la lista de países:', error)
        );
})