import React from 'react';
import axios from 'axios';
import style from 'styled-components';

const Button = style.button`
 display:inline-block; 
 color:white;
 background-color:#dc4444;
 border:none;
 padding: 5px 15px 5px 15px;
 margin: 5px;
`;

export default (props)=>{
  const onClick = async (e)=>{
    try {
      let response = await axios.get('/apiv1/logout');
      props.onLogout(response);
    } catch (error) {
      props.onLogout(error);
    }
  }
  return(
    <Button onClick={onClick}> Logout </Button>
  )
}