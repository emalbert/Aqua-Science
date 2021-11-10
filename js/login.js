//Este archivo controla la generación del archivo con las credenciales locales de administrador y su correspondiente validación

$(document).ready(function(){
    //Si el localStorage está vacío le ingreso información desde el archivo JSON
    let localstatus = sessionStorage.getItem('credenciales');
    if (localstatus == null) {
        //Petición JQuery asíncrona a archivo JSON local
        console.log('El localstorage está vacío y lo lleno con info del JSON');

        const URLGET = "data/credentials.json";
        $.get(URLGET, function (informacion, estado) {
            if ( estado == "success" ) {
                for (const info of informacion) {
                    const usuario = new Credentials(info.usuario,info.password);
                    arregloUsuarios.push(usuario);
                }
                sessionStorage.setItem('credenciales',JSON.stringify(arregloUsuarios));
            }
        });

    }
});

var btnLogin = document.getElementById('btn-login');
btnLogin.addEventListener('click', validarUsuario);

//Función que valida el login contra las credenciales almacenadas en el sessionStorage "credenciales"
function validarUsuario (e) {
    e.preventDefault();
    let credencialesLocales = JSON.parse(sessionStorage.getItem('credenciales'));
    let campoUsuario = document.getElementById('usuario').value;
    let campoPassword = document.getElementById('password').value;
    if ((credencialesLocales[0].usuario == campoUsuario) && (credencialesLocales[0].password == campoPassword)) {
        
        swal({
            title: 'Logueo exitoso!',
            text: "Bienvenido usuario Admin",
            icon: 'success'
        })
        .then(() => {
            location.href = 'dashboard.html';
        });
        
        //Cambiamos la propiedad validacion del sessionStorages "credenciales" a true para indicar que el usuario administrador se encuentra logueado
        credencialesLocales[0].validacion = true;
        sessionStorage.setItem('credenciales',JSON.stringify(credencialesLocales));

    } else {
        swal("Logueo fallido", "Intente nuevamente", "error");
        document.getElementById('usuario').value = '';
        document.getElementById('password').value = '';
    }
};


