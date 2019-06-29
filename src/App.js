import React, { Component } from 'react';
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
    this.setState({ user });
    getUserPermissions(this.state.user.credential.username).then(response=>{
      let user = this.state.user;
      user.permissions = response.data.data.entity;
      user.permittedFeatures = [];
      for(let feature of features){
        if(user.permissions.find(permission=>permission.name === feature.requiredPermission)){
          user.permittedFeatures.push(feature);
        }
      }
      this.setState({ user });
    }).catch(error=>console.log(error));
  }

  onLogout(result){
    if(result.status === 200 && result.data.status === 'ok'){
      this.setState({user:null});
    }
    
  }

  onMessage(message){
   this.setState({message:message});
  }

  get LoginPage(){
   return (props) => this.state.user? <Redirect to="/" /> : <LoginPage onLogin={this.onLogin} /> 
  }
  
  get HomePage(){
   return (props) => this.state.user?<UserHome {...props} user={this.state.user} onLogout={this.onLogout} onMessage={this.state.message}/>:<Redirect to="/login"/>
  }

  render() {
   console.log(this.state.user);
    // const login = ()=>{return this.state.user?<Redirect to="/" />:<LoginPage onLogin={this.onLogin}/> }
    // const userHome = (props)=>{return this.state.user?<UserHome {...props} user={this.state.user} onLogout={this.onLogout} onMessage={this.state.message}/>:<Redirect to="/login"/>}
    const NOT_FOUND = ({history})=>{return(<div><h1>Page Not Found</h1></div>)}
    return (
     <Router>
      <Switch>
        <Route path="/login" render={this.LoginPage} />
        <Route path="/" render={this.HomePage} />
      </Switch>
     </Router>
    );
  }
}

export default App;
