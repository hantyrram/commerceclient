/**
 * FetchAlles All Permissions.
 */

import {useContext} from 'react';
import axios from 'axios';
import {
   product_Create_Nok,
   product_Create_Ok,
   product_Create_Pending,
   product_Update_Nok,
   product_Update_Ok,
   product_Update_Pending,
   product_FetchAll_Nok,
   product_FetchAll_Ok,
   product_FetchAll_Pending,
} from './action_creators/product';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';

export const useProduct_Create = ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(product){
      console.log(product);
      try {
         dispatch(product_Create_Pending());
         let {data} = await axios.post(`/apiv1/catalog/products`,product);
         console.log(data);
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

export const useProduct_Update = ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(product){
      try {
         dispatch(product_Update_Pending());
         let {data} = await axios.patch(`/apiv1/catalog/products`,product);
         console.log(data);
         if(data.ok){
            dispatch(product_Update_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(product_Update_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}



export const useProduct_FetchAll = ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(product){
      console.log(product);
      try {
         dispatch(product_FetchAll_Pending());
         let {data} = await axios.get(`/apiv1/catalog/products`);
         console.log(data);
         if(data.ok){
            dispatch(product_FetchAll_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(product_FetchAll_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}