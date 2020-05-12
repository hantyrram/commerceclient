import React, { Component } from 'react';
import {
   BrowserRouter as Router, 
   Redirect,
   Route,
   Switch} from 'react-router-dom';
   
import LoginPage from 'pages/Login';
import AdminPage from 'pages/Admin';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest'

function App(props){

   return(
      <Router>
         <Switch>
            <Route path="/auth/login" component={LoginPage} />
            <Route path="/" component={AdminPage} />
         </Switch>
      </Router>
   )
}

export default App;
