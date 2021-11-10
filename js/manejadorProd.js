//Función que muestra la tabla de productos en el Dashboard
function mostrarProductos() {
    let tabla = document.getElementById('tabla-productos');
    tabla.innerHTML = '';
    let listaTemp = JSON.parse(localStorage.getItem('listadoProductos'));

    for(let p = 0; p < listaTemp.length; p++) {
        let fila = document.createElement('tr'); //Creo una nueva fila a la tabla
        fila.innerHTML = `
                <td>${listaTemp[p].nombre}</td>
                <td>${listaTemp[p].presentacion}</td>
                <td>$ ${listaTemp[p].precio}</td>
                <td><a href="#">Eliminar Producto</a></td>
        `; 
        tabla.appendChild(fila); //Agrego la información de un producto en la fila de la tabla
    }
}

//Función que crea un nuevo elemento Producto en base a los datos rellenados del formulario
function agregarProducto() {
    //Captura de datos de HTML y creación de nuevo objeto Producto
    let nuevoProducto;
    const nombre = document.getElementById('nombreProducto').value;
    const presentacion = document.getElementById('presentacionProducto').value;
    const precio = document.getElementById('precioProducto').value;
    const destacado =  document.getElementById('destacadoProducto');
    const imagen = 'https://via.placeholder.com/300';
    
    if (destacado.checked) {
        nuevoProducto = new Producto(nombre, presentacion, precio, 1, true, imagen);
    } else {
        nuevoProducto = new Producto(nombre, presentacion, precio, 1, false, imagen);
    }
    
    //Operaciones JSON sobre el arreglo de Productos
    
    arregloProductos = JSON.parse(localStorage.getItem('listadoProductos'));
    arregloProductos.push(nuevoProducto);
    localStorage.setItem('listadoProductos', JSON.stringify(arregloProductos));

    //Reset de formulario de la página
    document.getElementById('formulario-nuevo').reset();

    //Listado de Productos con el nuevo producto cargado
    mostrarProductos();

};

//Funciona que elimina un producto del localStorage
function eliminarProducto(producto) {
    let indexArreglo;
    let listaTemp = JSON.parse(localStorage.getItem('listadoProductos'));
    for(let p = 0; p < listaTemp.length; p++) {
        
        if (listaTemp[p].nombre == producto) {
            indexArreglo = p;
            break;
        }

    };

    listaTemp.splice(indexArreglo,1);

    localStorage.setItem('listadoProductos', JSON.stringify(listaTemp));

    //Listado de Productos con el nuevo producto eliminado
    mostrarProductos();

}

//Llamada inicial a la función que muestra la tabla de productos
mostrarProductos();

//Asignación de listener al boton Ingresar Nuevo Producto
let btnAgregarProducto = document.getElementById('btnProdNuevo');
btnAgregarProducto.addEventListener(('click'), (e) => {

    e.preventDefault();
    agregarProducto();

});

//Forma de captar a que elemento se hace referencia al momento de hacer click en Eliminar Producto
let listaProductos = document.getElementById('tabla-productos');
listaProductos.addEventListener(('click'), (e) => {

    e.preventDefault();
    let ubicacion = e.path[2].childNodes[1].innerHTML;
    if(e.target.innerHTML == 'Eliminar Producto') {
        eliminarProducto(ubicacion);
    }

});

//Calculo de la cantidad de elementos en el carrito
calcularCarritoUI();
//Calculo de si el Admin se encuentra logueado
esAdminUI()
