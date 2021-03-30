import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    this.googleAuthProvider = new app.auth.GoogleAuthProvider;
    this.facebookAuthProvider = new app.auth.FacebookAuthProvider;
  }

  //registrar usuario
  async registrar(nombre, email, password) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
      );
      return await nuevoUsuario.user.updateProfile({
        displayName: nombre,
      }); 
      
    };
 
    async enviarEmail(){
      const user = this.auth.currentUser
      user.sendEmailVerification().then(function(){
          alert('Se envio un email para verificar su cuenta')
      }).catch(function(error){
        console.log('hay un error', error)
      })
    }
  //iniciar sesion

  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async loginGoogle() {
    return this.auth.signInWithPopup( this.googleAuthProvider )
  }
  async loginFacebook() {
    return this.auth.signInWithPopup( this.facebookAuthProvider )
  }

  async forgot(emailAddress){
   
    
    this.auth.sendPasswordResetEmail(emailAddress).then(function() {
      alert('email enviado')
    }).catch(function(error) {
      // An error happened.
    });    
   
  }


  //cerrar sesion

  async cerrarSesion() {
    await this.auth.signOut();
  }
}

export const firebase = new Firebase();
export default firebase;
