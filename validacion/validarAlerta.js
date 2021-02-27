export default function validarCrearCuenta(valores) {

    let errores = {};
     if(!valores.nombre) {
         errores.nombre = 'El nombre es obligatorio'
     }

     if(!valores.raza){
         errores.raza = 'La raza es obligatorio'
     }
     if(!valores.descripcion){
        errores.descripcion = 'Agrega una descripcion de la mascota'
    }
    // if(!valores,url) {
    //     errores.url = "La url es obligatoria" 
    // }

     return errores
}