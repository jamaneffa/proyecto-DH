window.addEventListener('load', () => {
    document.getElementById('addToCartButton').addEventListener('click', function() {
        // Capturo los elementos de la vista
        const cantidadSeleccionada = parseInt(document.getElementById('cantidad').value);
        const precioProducto = parseFloat(document.getElementById('productPrice').textContent.replace('$', '').trim());
        
        // Creo un objeto para el producto actual
        const productoActual = {
            usuario: document.getElementById('userId').value,
            nombre: document.getElementById('productName').textContent,
            precio: precioProducto,
            cantidad: cantidadSeleccionada,
        };
        
        // Si hay productos guardados en localStorage, los guardo en una variable, sino creo un array vacio. 
        let productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

        // Agrego el producto actual a la lista de productos
        productosEnCarrito.push(productoActual);

        // Guardo la lista actualizada de productos en localStorage
        localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
        
        // Mensaje de confirmacion
        alert('El producto ha sido agregado al carrito');
    });
});
