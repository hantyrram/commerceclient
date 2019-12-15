/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from 'axios';
import {
   product_Create_Nok,
   product_Create_Ok,
   product_Create_Pending
} from './action_creators/product_Create';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(product){
      console.log(product);
      try {
         dispatch(product_Create_Pending());
         let {data} = await axios.post(`/apiv1/catalog/products`,product);
         
         if(data.ok){
            dispatch(product_Create_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(product_Create_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}