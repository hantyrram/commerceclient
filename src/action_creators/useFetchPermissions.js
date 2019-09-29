import React,{useContext} from 'react';
import axios from '../axios';
import StateContext from 'contexts/StateContext';

function useFetchPermissions(){
   //emit('CREATE_PERMISSIONS_BEGIN')
   let {dispatch}= useContext(StateContext);

   return async function(){
      try {
         dispatch({
            type:'FETCH_PERMISSIONS_PENDING'
         });
         let {data} = await axios.get('/apiv1/admin/permissions');
         console.log(data);
         if(data.ok){
            dispatch({
               type: 'FETCH_PERMISSIONS_OK',
               payload: data.resource
            });
            return;
         }
         dispatch({
            type: 'FETCH_PERMISSIONS_NOK',
            payload: data.error
         })
      } catch (error) {
         dispatch({
            type: 'FETCH_PERMISSIONS_NOK',
            payload: {type: 'CLIENT_ERROR',text:'axios failed'}
         })
      }
   }
}

export default useFetchPermissions;

