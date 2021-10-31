import React, { useState } from "react";

import "./App.css";

import { Redirect, Route, Router, Switch } from "react-router-dom";
import Signin from "./components/authentification/signin";
import Signup from "./components/authentification/signup";
import Header from "./components/header/header";
import { AuthContext, AuthProvider } from "./context/authContext";
import { useContext } from "react";
import Home from "./pages/home";
import Footer from "./components/footer/footer";
import ProfileView from "./pages/ProfileView";
import ContactUs from "./components/Contact/ContactUs";
// import AboutUs from "./pages/AboutUs";
import Acceuil from "./pages/acceuil";
import Profile from "./pages/profile";
import Search from "./pages/Search";

function App() {
  const authContext = useContext(AuthContext);
  return (
    // authContext.loading ? null : (
    <div>
      {/* !there is an error in the header */}
      <Header />
      <Switch>
        <Route exact path="/Acceuil" component={Acceuil} />
        <Route exact path="/Search" component={Search} />
        <Route exact path="/">
          {authContext.auth.token ? (
            <Home />
          ) : (
            // <Home />
            <Redirect to="/signin" />
          )}
        </Route>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin">
          {!authContext.auth.token ? <Signin /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/profileView" component={ProfileView} />

        <Route exact path="/user/:id" component={Profile} />

        <Route path="/ContactUs" component={ContactUs} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
