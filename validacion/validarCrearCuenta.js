export default function validarCrearCuenta(valores) {

    let errores = {};
     if(!valores.nombre) {
         errores.nombre = 'El nombre es obligatorio'
     }

     if(!valores.email) {
         errores.email = 'Email obligatorio'
     } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
         errores.email = "email no valido"
     }

     if(!valores.password) {
         errores.password = "La contraseña es obligatoria"

     } else if( valores.length < 6){
         errores.password = "Minimo 6 caracteres"
     }

     return errores
}