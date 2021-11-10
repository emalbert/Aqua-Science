//*---- COMIENZO DE EJECUCIÓN DEL PROGRAMA ----*//

$(document).ready(function(){

    //Si el localStorage está vacío le ingreso información desde el archivo JSON
    let localstatus = localStorage.getItem('listadoProductos');
    if (localstatus == null) {
        //Petición JQuery asíncrona a archivo JSON local
        console.log('El localstorage está vacío y lo lleno con info del JSON');

        const URLGET = "data/listado-productos.json";
        $.get(URLGET, function (informacion, estado) {
            if ( estado == "success" ) {
                for (const info of informacion) {
                    const nuevoProducto = new Producto(info.nombre,info.presentacion,info.precio,info.cantidad,info.destacado, info.imagen);
                    arregloProductos.push (nuevoProducto);
                }
                localStorage.setItem("listadoProductos",JSON.stringify(arregloProductos));
            }
        });

    }

    setTimeout ( function () {
        insertarDestacadosUI();
    }, 1000);

    setTimeout ( function () {
    $('.card-producto').hover(
        function () { 
            $(this)
                .css({
                "box-shadow":"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                })
                .animate({
                    marginTop: "0%",
                    },
                    'fast'
                );
        },
        
        function () { 
            $(this)
                .css({
                "box-shadow":"none",
                })
                .animate({
                    marginTop: "10%",
                    },
                    'fast'
                );
        }
    );
    }, 2000);

    //Pequeño efecto Jquery que me muestra una sección completa al hacer scroll y llegar a la zona en la que se encuentra
    $(window).scroll(function() {
        if ($(this).scrollTop()>0) {
            $('#productos-destacados').fadeIn(2000);
        } else {
            $('#productos-destacados').hide();
        }
        if ($(this).scrollTop()>700) {
            $('#nosotros').fadeIn(2000);
        } else {
            $('#nosotros').hide();
        }
        if ($(this).scrollTop()>1500) {
            $('#servicios').fadeIn(2000);
        } else {
            $('#servicios').hide();
        }
        if ($(this).scrollTop()>2000) {
            $('#contacto').fadeIn(2000);
        } else {
            $('#contacto').hide();
        }
    });

    
    //Actualizamos el valor del carrito en el navbar
    calcularCarritoUI();

    //Verificamos si el usuario Admin está logueado
    esAdminUI();
 

});






