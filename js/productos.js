
//Inserto los productos en la pantalla
insertarProductosUI();

$(document).ready(function () {
    //Creo un efecto de hover al pasar el cursor por la card del producto
    $('.card-producto').hover(
        function () { 
            $(this)
                .css({
                "box-shadow":"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                })
                .animate({
                    marginTop: "-10%",
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
                    marginTop: "40%",
                    },
                    'fast'
                );
        }
    );
    //Vinculo el botón comprar con la función comprarProducto    
    $('.btn-compra').on("click", comprarProducto);
});

//Calculo el valor del carrito en el navbar
calcularCarritoUI();
//Calculo si el admin se encuentra logueado
esAdminUI();