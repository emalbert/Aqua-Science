//Este archivo valida el ingreso a la pantalla del Dashboard sólo si el usuario admin está logueado

let localstatus = sessionStorage.getItem('credenciales');
//Si el sessionStorage está vacío redirecciono a login que crea el sessionStorage
if (localstatus == null) {
    location.href= 'login.html';
    console.log ('El sessionStorage está vacío');
} else {
    //Si el sessionStorage tiene info verifico si el campo validacion se encuentra en false indicando que el usuario admin no se logueo con éxito y redirecciono a login
    let credencialesLocales = JSON.parse(sessionStorage.getItem('credenciales'));
    if (credencialesLocales[0].validacion != true) {
        location.href= 'login.html';
        console.log('Existe sessionStorage pero no está logueado el usuario');
    }
}

