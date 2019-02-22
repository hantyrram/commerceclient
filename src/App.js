import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router, 
  Redirect,
  Route,
  Switch} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserHome from './pages/UserHome';
import features from './features';
import {user_permissions_read as getUserPermissions} from './features/requesters';
import './App.css';

/**
 * Checks if the user has the given permission.Note: MUST bind user as this.
 * @param {string} permissionName 
 */
const hasPermission = function(permissionName){
  if(!this.permissions || this.permissions.length < 1 )return false;
  return this.permissions.find(permission=>permission.name === permissionName);
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:null
    }
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin(user){//after successful login
    user.hasPermission = hasPermission.bind(user);
    this.setState({user:user});
    //replace with user.getOwnPermissions();
    getUserPermissions(this.state.user.username).then(response=>{
      let user = this.state.user;
      user.permissions = response.data.data.permissions;
      user.features = [];
      features.forEach(feature=>{
       let truthTable = user.permissions.map(permission=>{
        return feature.actions.includes(permission);
       });
       if(truthTable.includes(true)){//the feature can handle at least one of the permission
        //fetch the feature,add as a feature of user
        user.features.push(feature);
       }

      });
      this.setState({user:user});
    });
    
  }

  onLogout(result){
    if(result.status === 200 && result.data.status === 'ok'){
      this.setState({user:null});
    }
    
  }

  onMessage(message){
   this.setState({message:message});
  }

  render() {
    const login = ()=>{return this.state.user?<Redirect to="/" />:<LoginPage onLogin={this.onLogin}/> }
    const userHome = (props)=>{return this.state.user?<UserHome {...props} user={this.state.user} onLogout={this.onLogout} onMessage={this.state.message}/>:<Redirect to="/login"/>}
    const NOT_FOUND = ({history})=>{return(<div><h1>Page Not Found</h1></div>)}
    return (
     <Router>
      <Switch>
        <Route path="/login" render={login} />
        <Route path="/" render={userHome} />
      </Switch>
     </Router>
    );
  }
}

export default App;
