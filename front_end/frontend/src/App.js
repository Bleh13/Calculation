import React,{Component} from 'react';
import './App.css';
import Nav from './Navbar';
import Login from './login'
import Signin from './signup'
import Dashboad from './dashboard'
import Updateprofile from './updateprofile';
import Firebasephonesignup from './firebasephonesignup'
import {Routes, Route,Navigate, BrowserRouter as Router,Link} from "react-router-dom"
import PrivateRoute from './Privateroute';
import Publicroute from './Publicroute';
import { AuthContextProvider,useAuthState } from './authcontext'
import Additems from './Additems';
import ViewInventory from './ViewInventory';

export default function App (){
  
  return (
    <div>
    <Router>
    <AuthContextProvider> 
      <Nav/> 
<Routes>
< Route exact path='/login' element={
<Publicroute><Login/></Publicroute>
}/>
<Route exact path='/signup' element={
  <Publicroute><Signin/></Publicroute>
}/>

<Route exact path='/dashboard' element={
<PrivateRoute><Dashboad/></PrivateRoute>
}/>
<Route exact path='/update' element={
<PrivateRoute><Updateprofile/></PrivateRoute>
}/>
<Route exact path='/Additems' element={
<PrivateRoute><Additems/></PrivateRoute>
}/>
<Route exact path='/ViewInventory' element={
<PrivateRoute><ViewInventory/></PrivateRoute>
}/>
<Route exact path='/signupwithphoneno' element={

<Publicroute><Firebasephonesignup/></Publicroute>
}/>
</Routes>
    </AuthContextProvider>     
    </Router>

    </div>
  );
}

