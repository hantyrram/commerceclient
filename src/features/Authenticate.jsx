import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import HTSpinner from '../components/HTSpinner';
import {authenticate} from './requesters';

const API_ENDPOINT = '/apiv1/authenticate';

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
  backgroundColor: "#4CAF50",
  border: "none",
  color: "white",
  fontSize: "1.5em",
  padding: ".5em"
}
class Authenticate extends Component {
  constructor(props){
    super(props);
    this.state = {
      authTries: 0, //number of tries authentication was sent
      authResult: false,
    }
  }
  async componentDidMount(){
    try {
      let response = await authenticate();    
      const user = response.data.data.entity;
      this.props.onAuth(user);  
    } catch (error) {
      this.props.onError(error);
    }
  }

  render() { 
    return ( 
      <HTSpinner />
    )
  }
}

 
export default Authenticate;