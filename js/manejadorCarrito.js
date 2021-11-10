function mostrarCarrito() {
    //Creo una variable que represente a mi tabla de productos del carrito
    let tabla = document.getElementById('tabla-carrito');
    //Traigo el contenido del carrito almancenado en el localStorate
    let listaTemp = JSON.parse(localStorage.getItem('listadoCarrito'));
    //Inicializo en 0 la variable encargada de mostrar el monto final a pagar en el carrito
    let totales = 0;
    //Si hay productos en el carrito muestro el contenido del mismo
    if (listaTemp != undefined) {
        for(let p = 0; p < listaTemp.length; p++) {
            //Inicializo en 0 la variable encargada de mostrar el monto final de cada uno de los productos
            let subtotales = 0;
            //Creo una nueva fila a la tabla
            let fila = document.createElement('tr');
            //Agrego un elemento del carrito a la tabla de productos del carrito
            fila.innerHTML = `
            <td>${listaTemp[p].nombre}</td>
            <td>${listaTemp[p].presentacion}</td>
            <td>$ ${listaTemp[p].precio}</td>
            <td>${listaTemp[p].cantidad}</td>
            <td>$ ${listaTemp[p].precio*listaTemp[p].cantidad}</td>
            <td>
            <!--Agrego un dataset a cada uno de los botones para vincular fácilmente el elemento del carrito correspondiente-->
                <button class="btn btn-success btn-sumar-cantidad" data-nombre="${listaTemp[p].nombre}">+</button>
                <button class="btn btn-secondary mx-2 btn-restar-cantidad" data-nombre="${listaTemp[p].nombre}">-</button>
                <button class="btn btn-danger btn-eliminar-producto" data-nombre="${listaTemp[p].nombre}">Eliminar</button>
            </td>
            `;
            //Agrego la información de un producto en la fila de la tabla
            tabla.appendChild(fila); 
            //Calculo el monto final de cada producto (precio x cantidad)
            subtotales = listaTemp[p].precio*listaTemp[p].cantidad;
            //Agrego el monto final de cada producto al monto final del carrito
            totales += subtotales;
        }
        //Creo la fila de totales al final de la tabla de productos del carrito
        let filaTotales = document.createElement('tr');
        //Ingreso en esta nueva fila el monto total a abonar del carrito
        filaTotales.innerHTML = `<td colspan="4"></td><td style="background-color: limegreen">$ ${totales}</td>`;
        //Agrego la fila a la tabla
        tabla.appendChild(filaTotales);
    }
}

$(document).ready(function(){

    let carritoProductos = JSON.parse(localStorage.getItem('listadoCarrito'));


    //Cuando la página se encuentra cargada procedo a mostrar los productos del carrito y el valor del icono del carrito en la barra de navegación del sitio
    mostrarCarrito();
    calcularCarritoUI();
    esAdminUI();
    
    //Botón de limpiar el carrito para borar todos los elementos del mismo
    $('#btnLimpiarCarrito').click(function (e) { 
        localStorage.removeItem('listadoCarrito');
        document.location.reload();
    });
    
    //Botón que simula un envío del pedido del carrito al servidor y la posterior limpieza del carrito
    $('#btnComprarCarrito').click(function (e) { 
        let listaTemp = JSON.parse(localStorage.getItem('listadoCarrito'));
        if (listaTemp != undefined) {
            alert('Muchas gracias por su compra!');
            localStorage.removeItem('listadoCarrito');
            document.location.reload();
        } else {
            alert('Debe incluir productos al carrito');
        }
    });
    
    //Botón que suma cantidades al carrito y actualiza los valores en el sitio
    $('.btn-sumar-cantidad').click(function (e) {
        //Se recorre el arreglo hasta que se encuentra el nombre del producto según el nombre que trae el dataset
        for (let l = 0; l < carritoProductos.length; l++) {
            if (carritoProductos[l].nombre == (e.target.dataset.nombre)) {
                //Al producto encontrado se le suma al atributo cantidad 1 en el localStorage
                carritoProductos[l].cantidad += 1;
                break;
            } else {
                console.log('Producto no encontrado.');
            }
              
        }
        //Una vez actualizado el carritoProductos, actualizo el localStorage listadoCarrito  
        localStorage.setItem("listadoCarrito",JSON.stringify(carritoProductos));
        //Se carga nuevamente la página con los valores actualizados tanto en el carrito del navbar como en la tabla y los respectivos totales y subtotales
        document.location.reload();
    });
    
    $('.btn-restar-cantidad').click(function (e) {
        //Se recorre el arreglo hasta que se encuentra el nombre del producto según el nombre que trae el dataset
        for (let l = 0; l < carritoProductos.length; l++) {
            if (carritoProductos[l].nombre == (e.target.dataset.nombre)) {
                //Al producto encontrado se le resta al atributo cantidad 1 en el localStorage siempre y cuando cantidad sea mayor que 0
                if (carritoProductos[l].cantidad > 0 ) {
                    carritoProductos[l].cantidad -= 1;
                }
                break;
            } else {
                console.log('Producto no encontrado');
            }      
        }
        //Una vez actualizado el carritoProductos, actualizo el localStorage listadoCarrito  
        localStorage.setItem("listadoCarrito",JSON.stringify(carritoProductos));
        //Se carga nuevamente la página con los valores actualizados tanto en el carrito del navbar como en la tabla y los respectivos totales y subtotales
        document.location.reload();
    });
    
    
   
    $('.btn-eliminar-producto').click(function (e) {
        //Se recorre el arreglo hasta que se encuentra el nombre del producto según el nombre que trae el dataset
        for (let l = 0; l < carritoProductos.length; l++) {
            if (carritoProductos[l].nombre == (e.target.dataset.nombre)) {
                var index = l;
                carritoProductos.splice(index,1);
            }
        }

        //Una vez actualizado el carritoProductos, actualizo el localStorage listadoCarrito  
        localStorage.setItem("listadoCarrito",JSON.stringify(carritoProductos));
        //Se carga nuevamente la página con los valores actualizados tanto en el carrito del navbar como en la tabla y los respectivos totales y subtotales
        document.location.reload();
    });
});

