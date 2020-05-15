import React from 'react';
import {
   BrowserRouter as Router, 
   Redirect,
   Route,
   Switch} from 'react-router-dom';
import useAppState from 'appstore/useAppState';
import LoginPage from 'pages/Login';
import AdminPage from 'pages/Admin';


function App(props){

   const { identity } = useAppState().getAppState();

   return(
      <Router>
         <Switch>
            <Route exact path="/auth/login" component={LoginPage} />
            <Route path="/" 
               render = { 
                  (props) => {
                     if(!identity){
                        return <Redirect to="/auth/login" />
                     }
                     return (
                        <AdminPage {...props} />
                     )
                  } 
               } />
         </Switch>
      </Router>
   )
}

export default App;
