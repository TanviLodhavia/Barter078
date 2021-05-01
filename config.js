import firebase from 'firebase';
require ('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCyNMeQPTHJgIaE03WqIsmpYUFQ6U02gUM",
    authDomain: "barter-system-35e1b.firebaseapp.com",
    projectId: "barter-system-35e1b",
    storageBucket: "barter-system-35e1b.appspot.com",
    messagingSenderId: "398414119028",
    appId: "1:398414119028:web:ff74d365987107e0961121"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore()