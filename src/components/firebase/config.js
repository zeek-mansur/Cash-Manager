import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCf9Px0LCR2xt6fwMuETq4sT39Zbk6Tp1A",
    authDomain: "mycash-75402.firebaseapp.com",
    projectId: "mycash-75402",
    storageBucket: "mycash-75402.appspot.com",
    messagingSenderId: "619929490139",
    appId: "1:619929490139:web:1f73466aa07346c02bf2fe"
  };



  // init firebase 

  firebase.initializeApp(firebaseConfig)


  // init service 

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

export {projectFirestore, projectAuth}