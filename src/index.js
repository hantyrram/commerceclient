import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from './axios';
import App from './App';

const Test = ()=>{
 axios.post('/apiv1/login',{username:"htu00001",password:"eGPK1P2G#3"}).then(r=>console.log(r));
 return <div>X</div>
}
ReactDOM.render(<Test />, document.getElementById('root'));

