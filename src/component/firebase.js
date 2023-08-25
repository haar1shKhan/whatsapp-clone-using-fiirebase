// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCFIxTFxNq5mVr35RT4vYtZ_6vGtcArD3I",
    authDomain: "whatsapp-clone-58285.firebaseapp.com",
    projectId: "whatsapp-clone-58285",
    storageBucket: "whatsapp-clone-58285.appspot.com",
    messagingSenderId: "793036931212",
    appId: "1:793036931212:web:f6854997f3fcc8440a7ba9",
    measurementId: "G-LNLM7VZ33Y"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new  firebase.auth.GoogleAuthProvider()

  export {auth,provider}
  export default db