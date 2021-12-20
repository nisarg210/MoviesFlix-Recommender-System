import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Routes from "./config/Routes";
import { useEffect, useState } from "react";

function App() {
  const [login, setlogin] = useState(false);
  function getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  useEffect(() => {
    if (getUser) {
      setlogin(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Route
        render={(props) =>login ? (
          <>
          
            <Header {...props} />
            <Routes />
            <Footer />
          </>
        ):(<Routes />)}
      />
    </BrowserRouter>
  );
}

export default App;
