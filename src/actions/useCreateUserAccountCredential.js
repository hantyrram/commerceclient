/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from '../axios';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(employee,credential){
      
      try {
         let {data} = await axios.post(`/apiv1/employees/${employee._id}/useraccount/credential`,credential);
         console.log(data);
         if(data.ok){
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         emit('error',data.error);
         return;
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}