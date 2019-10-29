/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from 'axios';
import {
   productCategory_Create_Nok,
   productCategory_Create_Ok,
   productCategory_Create_Pending
} from './action_creators/productCategory_Create';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(productCategory){
      try {
         dispatch(productCategory_Create_Pending());
         let {data} = await axios.post(`/apiv1/catalog/productcategories`,productCategory);
         console.log(data);
         if(data.ok){
            dispatch(productCategory_Create_Ok({productCategory: data.resource}));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(productCategory_Create_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}