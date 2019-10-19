/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from 'axios';
import { 
   apis_Fetch_Pending,
   apis_Fetch_Ok,
   apis_Fetch_Nok,
} from './action_creators/apis_Fetch';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(){
      try {
         dispatch(apis_Fetch_Pending());
         let {data} = await axios.get(`/apiv1/admin/apis`);
         if(data.ok){
            dispatch(apis_Fetch_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(apis_Fetch_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}