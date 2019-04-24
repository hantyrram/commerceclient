import React, { Component } from 'react';
import Authenticate from './Authenticate';
import {login} from './requesters';
const API_ENDPOINT = '/apiv1/login';

const formStyle = {
  display:"flex",
  flexDirection:"column",
  width:"30%",
  height:"45%",
  padding: "2em",
  backgroundColor:"white",
  justifyContent:"space-evenly",
  boxShadow:"-1px -1px 5px rgba(0,0,0, 0.20),1px 1px 5px rgba(0,0,0,.19)"
}

const inputStyle = {
  marginTop:"5px",
  paddingLeft:"2px",
  minHeight:"2em",
  minWidth:"inherit",
  fontSize:"1em"
  
}
const buttonStyle = {
  backgroundColor: "rgb(41, 149, 153)",
  border: "none",
  color: "white",
  fontSize: "1.5em",
  padding: ".5em"
}
class Login extends Component {
  constructor(props) {
    super(props);
    let U_SID;
    if(document.cookie){
      U_SID = document.cookie.split(';').find(c=>{
        return c.trim().split('=')[0] === 'U_SID';
      });
    }
    this.state = { 
      username:null,
      password:null,
      session: U_SID
     }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onError = this.onError.bind(this);
  }

  onChange(e){
    switch(e.target.name){
      case 'username':this.setState({username:e.target.value,password:this.state.password});break;
      case 'password':this.setState({password:e.target.value,username:this.state.username});break;
      default:break;
    }
  }

  onSubmit(e){
    e.preventDefault();
    login({username:this.state.username,password:this.state.password}).then(response=>{
     let user = response.data.data.entity;
     this.props.onLogin(user);
    }).catch(e=>{
     console.log(e);
    });
  }

  onError(error){
    console.log('Logging Error');
    console.log(error);
    this.setState({session:null});
  }
  
  render() { 
    if(this.state.session){
      return <Authenticate onAuth={this.props.onLogin} onError={this.onError}/>
    }
    return ( 
      <form action="" style={formStyle} onSubmit={this.onSubmit}>
          <div style={{minWidth:"95%"}}>
            <label htmlFor="username" >Username</label>
            <input id="username" type="text" name="username" style={inputStyle} onChange={this.onChange}/>
          </div>
          <div style={{minWidth:"95%"}}>
            <label htmlFor="password" >Password</label>
            <input id="password" type="text" name="password" style={inputStyle} onChange={this.onChange}/>
          </div>
          <button style={buttonStyle}> Login</button>
      </form>
     );
  }
}

Object.defineProperty(Login,'path',{get:()=>'/login'});
 
export default Login;