import React from 'react';
import style,{keyframes} from 'styled-components';

const keyframe = keyframes`
 0% {transform:rotate(0deg);border-top-color:#0b90cc} 
 50% {transform:rotate(180deg);border-top-color:#e67286}    
 100% {transform: rotate(360deg);}
`
// @-webkit-keyframes spinner{
//  0% {transform:rotate(0deg);border-top-color:#0b90cc} 
//  50% {transform:rotate(180deg);border-top-color:#e67286}    
//  100% {transform: rotate(360deg);}
// }

// @keyframes spinner{
//  0% {transform:rotate(0deg);border-top-color:#0b90cc} 
//  50% {transform:rotate(180deg);border-top-color:#e67286}    
//  100% {transform: rotate(360deg);}
// }
// div#spinner {
//  border-style: solid;
//  color: #CBC6C6;
//  border-radius: 50%;
//  border-top-color: green;
//  border-width: 14px;
//  width: 50px;
//  height: 50px;
//  -webkit-animation: 2s linear infinite x;
//  animation: 1s linear infinite spinner;
// }

const Div = style.div`
 border-style: solid;
 color: #CBC6C6;
 border-radius: 50%;
 border-top-color: green;
 border-width: 14px;
 width: 50px;
 height: 50px;
 -webkit-animation: 2s linear infinite x;
 animation: ${keyframe} 1s linear infinite ;
`


export default (props)=>{
 return (
  <Div >X</Div>
 )
}

