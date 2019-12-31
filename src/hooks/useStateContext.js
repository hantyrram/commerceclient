import React,{useContext} from 'react';
import StateContext from '../contexts/StateContext';

export default ()=>{
   return useContext(StateContext);
}