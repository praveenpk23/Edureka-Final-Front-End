import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'; // Make sure to include firestore
var firebaseConfig = {
    apiKey: "AIzaSyBW4alN97nLKx8LbPyiWa_qfB2t-6ifnko",

    authDomain: "edureka-fooddelivery.firebaseapp.com",
  
    projectId: "edureka-fooddelivery",
  
    storageBucket: "edureka-fooddelivery.appspot.com",
  
    messagingSenderId: "1022209903911",
  
    appId: "1:1022209903911:web:0d5959d872349c365aed02",
  
    measurementId: "G-C9JRQV96CZ"
  

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase
