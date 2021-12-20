import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Signin from "./pages/Signin";
import Routes from "./config/Routes";
import { useState } from "react";
import { useStateValue } from "./StateProvider";

function App() {
 
  const [{ user }, dispatch] = useStateValue();
  return (
    <BrowserRouter>
      {user ? (
        <Route
          render={(props) => (
            <>
              <Header {...props} />
              <Routes />
              <Footer />
            </>
          )}
        />
      ) : (
        <Signin />
      )}
    </BrowserRouter>
  );
}

export default App;
