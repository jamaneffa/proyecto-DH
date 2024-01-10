document.addEventListener('DOMContentLoaded', function () {
    var userId = document.getElementById('userId').value;

    // Obtén la lista de favoritos del localStorage
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Obtén la sección del mainFav en la que mostrarás los productos favoritos
    var containerListProduct = document.querySelector('.containerListProduct');

    // Filtrar los favoritos del usuario actual
    var userFavorites = favorites.filter(function (favorite) {
        return favorite.usuario === userId;
    });

    // Recorrer los productos favoritos del usuario y agregarlos a la vista
    userFavorites.forEach(function (favorite) {
        // Construir la estructura HTML para mostrar cada producto favorito
        var productoFavoritoHTML = `
            <article class="producto">
                <a href="/products/${favorite.sku}">
                    <img src="${favorite.imagen}" alt="Producto favorito">
                    <div>
                        <p>${favorite.nombre}</p>
                        <p>Precio:${favorite.precio}</p>
                    </div>
                </a>
            </article>
        `;

        containerListProduct.innerHTML += productoFavoritoHTML;
    });
});