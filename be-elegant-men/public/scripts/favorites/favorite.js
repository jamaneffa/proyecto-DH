document.addEventListener('DOMContentLoaded', function () {
    var favoriteButton = document.getElementById('favoriteButton');

    // Verifica si el botón de favoritos y el usuario logueado existen en la página
    if (favoriteButton) {
        // Obtiene el SKU del producto
        var productSku = document.getElementById('productSku').value;

        // Obtiene el nombre del producto
        var productName = document.getElementById('productName').innerText;

        // Obtiene el precio del producto
        var productPrice = document.getElementById('productPrice').innerText;

        // Obtiene la URL de la imagen del producto
        var productImage = document.querySelector('.articleImagenPrincipal img').getAttribute('src');

        // Obtiene el ID del usuario
        var userId = document.getElementById('userId').value;

        // Obtiene la lista de favoritos del localStorage
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Verifica si el producto ya está en la lista de favoritos
        var existingFavoriteIndex = favorites.findIndex(function (favorite) {
            return favorite.usuario === userId && favorite.sku === productSku;
        });

        // Cambia la clase del icono del corazón según si el producto está en favoritos
        if (existingFavoriteIndex !== -1) {
            favoriteButton.classList.add('fa-solid', 'fa-heart');
        }

        // Agrega un evento de clic al botón de favoritos
        favoriteButton.addEventListener('click', function () {
            // Verifica nuevamente si el producto ya está en la lista de favoritos
            var existingFavoriteIndex = favorites.findIndex(function (favorite) {
                return favorite.usuario === userId && favorite.sku === productSku;
            });

            if (existingFavoriteIndex === -1) {
                // Agrega un nuevo elemento al array de favoritos
                favorites.push({
                    usuario: userId,
                    sku: productSku,
                    nombre: productName,
                    precio: productPrice,
                    imagen: productImage
                });

                // Cambia la clase del icono del corazón
                favoriteButton.classList.add('fa-solid', 'fa-heart');
            } else {
                // Elimina el elemento de la lista de favoritos
                favorites.splice(existingFavoriteIndex, 1);

                // Cambia la clase del icono del corazón
                favoriteButton.classList.remove('fa-solid', 'fa-heart');
                favoriteButton.classList.add('fa-regular', 'fa-heart');
            }

            // Actualiza el localStorage con la nueva lista de favoritos
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    }
});




