import React from "react";
import GoogleButton from "react-google-button";
import { fb } from "../Firebase/firebase";
import firebase from 'firebase'

const Signin = () => {
  const signinwithfirebase = () => {
    var google_provider = new firebase.auth.GoogleAuthProvider();
    fb
      .auth()
      .signInWithPopup(google_provider)
      .then((re) => {
        console.log(re);
      })
      .catch((err)=>{
          console.log(err)
      })
  };
  return (
    <div>
      <GoogleButton
        onClick={signinwithfirebase}
      />
    </div>
  );
};

export default Signin;
