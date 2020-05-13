/**
 * Fetches All Permissions.
 */

import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from './types';
export const productCategory_Create_Pending = ()=> ({type: types.PRODUCTCATEGORY_CREATE_PENDING});
export const productCategory_Create_Ok = (productCategory)=> ({type: types.PRODUCTCATEGORY_CREATE_OK, payload: productCategory});
export const productCategory_Create_Nok = (error)=> ({type: types.PRODUCTCATEGORY_CREATE_NOK,payload: error});

export const productCategory_Delete_Pending = ()=> ({type: types.PRODUCTCATEGORY_DELETE_PENDING});
export const productCategory_Delete_Ok = (productCategory)=> ({type: types.PRODUCTCATEGORY_DELETE_OK, payload: productCategory});
export const productCategory_Delete_Nok = (error)=> ({type: types.PRODUCTCATEGORY_DELETE_NOK,payload: error});

export const productCategory_Fetch_Pending = ()=> ({type: types.PRODUCTCATEGORY_FETCH_PENDING});
export const productCategory_Fetch_Ok = (productCategory)=> ({type: types.PRODUCTCATEGORY_FETCH_OK, payload: productCategory});
export const productCategory_Fetch_Nok = (error)=> ({type: types.PRODUCTCATEGORY_FETCH_NOK,payload: error});



export const useProductCategory_Create = ()=>{
   
   let {dispatch} = useAppStore();

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
   
   let {dispatch} = useAppstore();

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
   
   let {dispatch} = useAppstore();

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