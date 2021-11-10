//Inserta los productos en pantalla
function insertarProductosUI(){
    $(document).ready(function () {
        let arregloProductosCliente = JSON.parse(localStorage.getItem('listadoProductos'));
        if (arregloProductosCliente != null ) {
            for (let p of arregloProductosCliente) {
                $('#contenedor-productos').append(`
                <div class="row">
                    <div class="col-sm-12 col-md-4 col-lg-2">
                        <div class="card card-producto" style="width: 18rem;">
                            <img src=${p.imagen} class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title py-2">${p.nombre}</h5>
                                <p class="card-text py-1 my-0">Presentación: ${p.presentacion}</p>
                                <p class="card-text" py-0">Precio: $${p.precio}</p>
                                <a href="#" id="${p.nombre}" class="btn btn-primary btn-compra">COMPRAR</a>
                            </div>
                        </div>
                    </div>
                </div>`);                                                   
            }
        }
        else {
            console.log('El localStorage está vacío');
        }
    });
}

// Muestra los 3 primeros productos destacados en la pantalla de inicio
function insertarDestacadosUI(){
    $(document).ready(function () {
        let contador = 0;
        let arregloProductosCliente = JSON.parse(localStorage.getItem('listadoProductos'));
        if (arregloProductosCliente != null) {
            for (let p of arregloProductosCliente) {
                if((p.destacado == true) && (contador < 3)) {
                    contador++;
                    $('.productos-destacados').append(`
                        <div class="col-sm-12 col-md-4">
                            <div class="card card-producto">
                                <img src=${p.imagen} class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title py-2">${p.nombre}</h5>
                                    <p class="card-text py-1 my-0">Presentación: ${p.presentacion}</p>
                                    <p class="card-text" py-0">Precio: $${p.precio}</p>
                                    <a href="#" id="${p.nombre}" class="btn btn-primary btn-compra">COMPRAR</a>
                                </div>
                            </div>
                        </div>
                    `);
                              
                }
            }
            $('.btn-compra').on("click", comprarProducto);     
        }
        else {
            console.log('El localStorage está vacío');
        }
    });
}

//Ingresa un producto al carrito
function comprarProducto(e){
    
    e.preventDefault();
    const nombreProducto = e.target.id;
   
    let carrito = localStorage.getItem('listadoCarrito');
    //Si el LocalStorage de listadoCarrito está vacío traigo el LocalStorage de Productos, encuentro el elemento y lo agrego al carritoProductos que está en null
    if (carrito == undefined) {
        arregloProductos = JSON.parse(localStorage.getItem('listadoProductos'));
        encontrado = arregloProductos.find(p => p.nombre == nombreProducto);
        carritoProductos.push(encontrado);
    } else {
    //Si el LocalStorage de listadoCarrito tiene elementos lo almaceno en carritoProductos y comienzo la búsqueda del elemento dentro del listadoCarrito
        carritoProductos = JSON.parse(localStorage.getItem('listadoCarrito'));
        let encontrado = carritoProductos.find(p => p.nombre == nombreProducto);
        //Si el producto no está dentro de listadoCarrito lo agrego como un producto nuevo
        if(encontrado == undefined){
            arregloProductos = JSON.parse(localStorage.getItem('listadoProductos'));
            encontrado = arregloProductos.find(p => p.nombre == nombreProducto);
            carritoProductos.push(encontrado);
        //Si el producto ya está cargado en listadoCarrito, le agrego +1 a la propiedad cantidad del producto    
        }else{
            encontrado.cantidad += 1;
        }
    }

    swal("Excelente!", "El producto ha sido agregado al carrito!", "success");
    //Una vez actualizado el carritoProductos, actualizo el localStorage listadoCarrito  
    localStorage.setItem("listadoCarrito",JSON.stringify(carritoProductos));

  //Muestro la nueva cantidad de elementos en mi localStorage de listadoCarrito en la barra de navegación
  calcularCarritoUI(); 

};

//Calcula la cantidad de productos que hay actualmente en el carrito
function calcularCarritoUI() {
    let cantidadItems = 0;
    let carrito = localStorage.getItem('listadoCarrito');
    //Si el localStorage de listadoCarrito no está vacío, parseo listadoCarrito en un arreglo y lo recorro almacenando en la variable cantidadItems las cantidades de cada uno de los elementos almacenados en el localStorage listadoCarrito
    if (carrito != undefined) {
        let arregloCarrito = JSON.parse(localStorage.getItem('listadoCarrito'));
        for (let i = 0; i < arregloCarrito.length; i++) {
            cantidadItems += arregloCarrito[i].cantidad;
        }
    }
    //Muestro al lado del icono del carrito la cantidad de unidades de productos que tengo seleccionadas actualmente
    $("#carrito-valor").html(cantidadItems);
}

//Consulta si el usuario administrador se encuentra logueado y en caso afirmativo habilita el item Dashboard (ABM de Productos) en la barra de navegación y cambia la leyenda de Login
function esAdminUI() {
    $(document).ready(function () {
        let administrador = sessionStorage.getItem('credenciales');
        //Si el sessionStorage de "credenciales" no está vacío, parseo "credenciales" en un arreglo y verifico si la propiedad validacion está en true para corroborar que el usuario admin se ha logueado
        if (administrador != undefined) {
            let arregloAdmin = JSON.parse(sessionStorage.getItem('credenciales'));
            
            if (arregloAdmin[0].validacion == true) {
                //Agrego el item Dashboard en el espacio destinado para ello en la barra de navegación
                $('#espacioDashboard').append(`
                    <li class="nav-item">
                        <a class="nav-link" href="dashboard.html">Dashboard</a>
                    </li>
                `);
                //Cambio el texto del Login
                $('#itemLogin').text('Hola, Masterpool');
                $('#itemLogin').css('color','#eeff00');
                
            }
        }
    });
}