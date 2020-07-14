import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css"
// react - router

import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom"

import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

//  Fire-base
import firebase from "firebase/app"
import "firebase/auth"
// Componets
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { UserContext } from './context/UserContext';
import Footer from './layout/Footer';
import Header from './layout/Header';
import firebaseConfig from './config/firebaseConfig'

// Init firebase
firebase.initializeApp(firebaseConfig);

const App = () => {


  const [user,setUser] =  useState(null)


  return (
    <Router>
      <ToastContainer/>

      <UserContext.Provider value={{user,setUser}}>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="*" component={PageNotFound}/>
          
        </Switch>
        <Footer/>

      </UserContext.Provider>

      
    </Router>
  );
}

export default App;
