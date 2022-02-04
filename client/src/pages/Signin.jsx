import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import logo from "./ms-icon.png";
import { fb } from "../Firebase/firebase";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import "./signin.scss";
import Typed from "typed.js";
const Signin = () => {
  const [state, dispatch] = useStateValue();
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
	const typed = React.useRef(null);
  const signinwithfirebase = () => {
    var google_provider = new firebase.auth.GoogleAuthProvider();
    fb.auth()
      .signInWithPopup(google_provider)
      .then((result) => {
        console.log(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
 useEffect(() => {
  typed.current = new Typed(el.current, {
    strings:[' Movies',' TV Shows',' and more ...'],
    typeSpeed: 200,
    backSpeed: 200,
    loop:true,
    loopCount: Infinity,
  }
 );
 
   return () => {
    typed.current.destroy();
   };
 }, []);
 
  return (
    <div className="signinfull">
        <div className="signin_body logo_sign">
        MoviesFlix
          <div className="logo_sign">
           
        
            Unlimited &nbsp;<span className="auto-input" ref={el}></span>
          </div>
          <div className="signbutton">
            <GoogleButton type="light" onClick={signinwithfirebase} />
          </div>
        </div>
      
    </div>
  );
};

export default Signin;
