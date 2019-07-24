import React, { Component } from 'react';
import {storiesOf} from '@storybook/react';
import Login from './Login';


const loginSuccessHandler = (credential)=>{
   console.log(credential);
}

storiesOf("User Home",module)
.add("Home Page",()=><Login onSuccess={loginSuccessHandler}/>);