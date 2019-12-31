/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from 'axios';
import {
   productCategory_Create_Nok,
   productCategory_Create_Ok,
   productCategory_Create_Pending,
   productCategory_Delete_Nok,
   productCategory_Delete_Ok,
   productCategory_Delete_Pending,
   productCategory_Fetch_Nok,
   productCategory_Fetch_Ok,
   productCategory_Fetch_Pending
} from './action_creators/productCategory';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export const useProductCategory_Create = ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(productCategory){
      console.log(productCategory);
      try {
         dispatch(productCategory_Create_Pending());
         let {data} = await axios.post(`/apiv1/catalog/productcategories`,productCategory);
         console.log(data);
         if(data.ok){
            dispatch(productCategory_Create_Ok(data.resource));
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

export const useProductCategory_Delete = ()=>{
   
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

export const useProductCategory_Fetch = ()=>{
   
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