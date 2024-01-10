window.addEventListener('DOMContentLoaded', () => {
    // Traigo la lista de productos en el carrito desde el localStorage
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito'));
    
    // Traigo el ID del usuario logueado desde el elemento HTML
    const userId = document.getElementById('userId');

    // Filtrar los productos en el carrito que pertenecen al usuario logueado
    const productosDelUsuario = productosEnCarrito.filter(producto => producto.usuario === userId.value);
    
    // Traigo el elemento HTML en el que deseas mostrar los productos del carrito
    const cuerpoCart = document.querySelector('.cuerpoCart');
    const contenedorInput = document.createElement('div')

    // Verifico si hay productos en el carrito para el usuario logueado
    if (productosDelUsuario.length > 0) {
        // Creo un formulario HTML para mostrar los productos
        const formularioHTML = document.createElement('form');
        formularioHTML.classList.add('formulario-carrito');
        formularioHTML.setAttribute('action', '/users/processOrder'); // Agrega el atributo action
        formularioHTML.setAttribute('method', 'post'); // Agrega el atributo method

        let contadorProductos = 0
        // Agrego los productos del usuario al formulario
        productosDelUsuario.forEach((producto, index) => {
            const fieldsetProducto = document.createElement('fieldset');
            fieldsetProducto.classList.add('producto');

            // Leyenda del fieldset
            const leyenda = document.createElement('legend');
            leyenda.textContent = 'Datos del Producto';
            fieldsetProducto.appendChild(leyenda);

            // Etiqueta y input para el nombre del producto
            const labelNombre = document.createElement('label');
            labelNombre.textContent = 'Nombre:';
            const nombreInput = document.createElement('input');
            nombreInput.type = 'text';
            nombreInput.name = `nombre_${index}`;
            nombreInput.value = producto.nombre;
            nombreInput.readOnly = true; // Hace que el input sea de solo lectura
            const containerNombreInput = document.createElement('div');
            fieldsetProducto.appendChild(labelNombre);
            fieldsetProducto.appendChild(containerNombreInput);
            containerNombreInput.appendChild(nombreInput);

            // Etiqueta e input para la cantidad del producto
            const labelCant = document.createElement('label');
            labelCant.textContent = 'Cantidad:';
            const cantidadInput = document.createElement('input');
            cantidadInput.type = 'number';
            cantidadInput.name = `cant_${index}`;
            cantidadInput.value = producto.cantidad;
            cantidadInput.readOnly = true; 
            const containerCantInput = document.createElement('div');
            fieldsetProducto.appendChild(labelCant);
            fieldsetProducto.appendChild(containerCantInput);
            containerCantInput.appendChild(cantidadInput);

            // Etiqueta y input para el precio Total del producto
            const labelPrecio = document.createElement('label');
            labelPrecio.textContent = 'Precio:';
            const precioInput = document.createElement('input');
            precioInput.type = 'text';
            precioInput.name = `precio_${index}`;
            precioInput.value = `$${producto.precio.toFixed(2)}`;
            precioInput.readOnly = true; 
            const containerPrecioInput = document.createElement('div');
            fieldsetProducto.appendChild(labelPrecio);
            fieldsetProducto.appendChild(containerPrecioInput);
            containerPrecioInput.appendChild(precioInput);

            // Etiqueta y input para el precio total del producto
            const labelPrecioTotal = document.createElement('label');
            labelPrecioTotal.textContent = 'Precio Total:';
            const precioTotalInput = document.createElement('input');
            precioTotalInput.type = 'text';
            precioTotalInput.name = `precio_total_${index}`;
            precioTotalInput.value = `$${producto.precio.toFixed(2) * cantidadInput.value}`;
            precioTotalInput.readOnly = true; 
            const containerPrecioTotalInput = document.createElement('div');
            fieldsetProducto.appendChild(labelPrecioTotal);
            fieldsetProducto.appendChild(containerPrecioTotalInput);
            containerPrecioTotalInput.appendChild(precioTotalInput);

            const eliminarBoton = document.createElement('button');
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.addEventListener('click', () => {
                // Obtengo el índice del producto en la lista original
                const productoIndex = productosEnCarrito.findIndex(item => item === producto);
                // Elimino el producto del carrito basado en el índice
                productosEnCarrito.splice(productoIndex, 1);
                // Actualizo el localStorage con la lista actualizada
                localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
                // Elimino el fieldset del producto y vuelvo a cargar la página para reflejar los cambios
                fieldsetProducto.remove();
                location.reload();
            });
            fieldsetProducto.appendChild(eliminarBoton);

            formularioHTML.appendChild(fieldsetProducto);
            //agrego el id del usuario en input hidden dentro del fomrualrio
            formularioHTML.appendChild(userId);
            contadorProductos ++
        });

        // Botón para comprar
        const comprarBoton = document.createElement('button');
        comprarBoton.textContent = 'Comprar';
        comprarBoton.type = 'submit'; // Cambia el tipo del botón a "submit"
        comprarBoton.classList.add('comprar-carrito');

        // Agrega el evento "submit" al formulario para manejar la compra
        formularioHTML.addEventListener('submit', (event) => {
            event.preventDefault()
            if (confirm('Estas seguro que queres realizar la compra?')){
                formularioHTML.submit()
                const productosRestantes = productosEnCarrito.filter(producto => producto.usuario !== userId.value);
                localStorage.setItem('productosEnCarrito', JSON.stringify(productosRestantes));
            } else {
                alert('No has enviado tu comentario')
            }

            //ants de salor de este formualrio tengo que mandar la cantidad de productos que salen finalemte
        });

        formularioHTML.appendChild(comprarBoton);

        //agrego un input para leer del formualrio la cantidad de productos q tengo en el carrito
        const totalProductosInput = document.createElement('input');
        totalProductosInput.type = 'hidden';
        totalProductosInput.name = `totalProductos`;
        totalProductosInput.id = `totalProductos`;
        totalProductosInput.value = contadorProductos;
        totalProductosInput.readOnly = true; 
        formularioHTML.appendChild(totalProductosInput);

        // Agrego el formulario al elemento 'cuerpoCart' en la página
        cuerpoCart.appendChild(formularioHTML);

        // Creo un botón para vaciar todo el carrito
        const vaciarCarritoBoton = document.createElement('button');
        vaciarCarritoBoton.textContent = 'Vaciar Carrito';
        vaciarCarritoBoton.classList.add('vaciar-carrito');
        vaciarCarritoBoton.addEventListener('click', () => {
            // Filtrar y mantener solo los productos que no pertenecen al usuario logueado
            const productosRestantes = productosEnCarrito.filter(producto => producto.usuario !== userId.value);
            // Actualizo el localStorage con la lista de productos restantes
            localStorage.setItem('productosEnCarrito', JSON.stringify(productosRestantes));
            // Vuelvo a cargar la página para reflejar los cambios
            location.reload();
        });

        // Agrego el botón de vaciar carrito
        cuerpoCart.appendChild(vaciarCarritoBoton);
    } else {
        // Muestro un mensaje si no hay productos para el usuario logueado
        cuerpoCart.innerHTML = '<p>El carrito está vacío.</p>';
    }
});
