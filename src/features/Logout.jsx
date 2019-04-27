import React from 'react';
import axios from 'axios';
import style from 'styled-components';
import {logout} from './requesters';

const Button = style.button`
 display:inline-block; 
 color:white;
 background-color:#dc4444;
 border:none;
 padding: 5px 15px 5px 15px;
 margin: 5px;
`;

export default (props)=>{
  
  const onClick = (e)=>{
   logout().then(response=>{
    props.onLogout(response);
   }).catch(e=>props.onLogout(e));
  }

  // const onClick = async (e) => {
  //  try {
  //   let response = await logout(); 
  //   let artifact = response.data;
  //  } catch (error) {
  //   let artifact = error.response.data;
  //  }
   
  // }

  return(
    <Button onClick={onClick}> Logout </Button>
  )
}