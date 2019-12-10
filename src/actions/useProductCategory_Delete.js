/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from 'axios';
import {
   productCategory_Delete_Nok,
   productCategory_Delete_Ok,
   productCategory_Delete_Pending
} from './action_creators/productCategory_Delete';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(productCategory){
      try {
         dispatch(productCategory_Delete_Pending());
         let {data} = await axios.delete(`/apiv1/catalog/productcategories/${productCategory._id}`);
         console.log(data);
         if(data.ok){
            dispatch(productCategory_Delete_Ok(productCategory));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(productCategory_Delete_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}