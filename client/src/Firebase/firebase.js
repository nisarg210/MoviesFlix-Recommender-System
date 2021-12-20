import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBmVoGbG1mre0dTSE94-o22SXJnekE69pA",
    authDomain: "moviesflix-b56f4.firebaseapp.com",
    projectId: "moviesflix-b56f4",
    storageBucket: "moviesflix-b56f4.appspot.com",
    messagingSenderId: "757798873345",
    appId: "1:757798873345:web:694504171a77c980ba5300"
  };

  firebase.initializeApp(firebaseConfig);

  export {firebase};