/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from '../axios';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(employeeId){
      try {
         let {data} = await axios.post('/apiv1/employees/verify',{employeeId});
         console.log(data);
         if(data.ok){
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}