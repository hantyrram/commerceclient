/**
 * FetchAlles All Permissions.
 */

import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from './types';

const product_Create_Pending = ()=> ({type: types.PRODUCT_CREATE_PENDING});
const product_Create_Ok = (product)=> ({type: types.PRODUCT_CREATE_OK, payload: product});
const product_Create_Nok = (error)=> ({type: types.PRODUCT_CREATE_NOK,payload: error});

const product_Update_Pending = ()=> ({type: types.PRODUCT_UPDATE_PENDING});
const product_Update_Ok = (product)=> ({type: types.PRODUCT_UPDATE_OK, payload: product});
const product_Update_Nok = (error)=> ({type: types.PRODUCT_UPDATE_NOK,payload: error});

const product_FetchAll_Pending = ()=> ({type: types.PRODUCT_FETCHALL_PENDING});
const product_FetchAll_Ok = (products)=> ({type: types.PRODUCT_FETCHALL_OK, payload: products});
const product_FetchAll_Nok = (error)=> ({type: types.PRODUCT_FETCHALL_NOK,payload: error});


export const useProduct_Create = ()=>{
   
   let {dispatch} = useAppstore();

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
   
   let {dispatch} = useAppstore();

   return async function(product){
      try {
         dispatch(product_Update_Pending());
         emit('pending','Updating Product');
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
   
   let {dispatch} = useAppstore();

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