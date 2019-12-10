/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from 'axios';
import {
   productCategory_Fetch_Nok,
   productCategory_Fetch_Ok,
   productCategory_Fetch_Pending
} from './action_creators/productCategory_Fetch';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(){
      try {
         dispatch(productCategory_Fetch_Pending());
         let {data} = await axios.get(`/apiv1/catalog/productcategories`);
         console.log(data);
         if(data.ok){
            dispatch(productCategory_Fetch_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(productCategory_Fetch_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}