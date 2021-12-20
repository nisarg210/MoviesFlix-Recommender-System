import React, { useState } from "react";

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { fb } from "../Firebase/firebase";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Signin from "../pages/Signin";

const Routes = () => {
  const [isUserSignIn, setisUserSignIn] = useState(true);
  fb.auth().onAuthStateChanged((user)=>{
      if(user){
          return setisUserSignIn(true)
      }
      setisUserSignIn(false)
  })
  if (isUserSignIn === true) {
    return (
      <Switch>
        {/* <Route path="/login" component={Signin} /> */}

        <Route path="/:category/search/:keyword" component={Catalog} />
        <Route path="/:category/:id" component={Detail} />
        <Route path="/:category" component={Catalog} />
        <Route path="/" exact component={Home} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact component={Signin} />
        <Redirect from="*"push to="/" />

      </Switch>
    );
  }
};

export default Routes;
