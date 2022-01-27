import React from "react";
import GoogleButton from "react-google-button";
import { fb } from "../Firebase/firebase";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Signin = () => {
  const [state, dispatch] = useStateValue();
  const signinwithfirebase = () => {
    var google_provider = new firebase.auth.GoogleAuthProvider();
    fb.auth()
      .signInWithPopup(google_provider)
      .then((result) => {
        console.log(result.user);
        localStorage.setItem("user",JSON.stringify(result.user) );
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <GoogleButton onClick={signinwithfirebase} />
    </div>
  );
};

export default Signin;
