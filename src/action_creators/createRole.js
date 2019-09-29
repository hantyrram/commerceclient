import React,{useContext} from 'react';
import axios from '../axios';
import StateContext from 'contexts/StateContext';

function useCreateRole(){
   //emit('CREATE_ROLE_BEGIN')
   let { getStore,dispatch} = useContext(StateContext);

   return async function(role){
      try {
         dispatch({
            type:'CREATE_ROLE_PENDING'
         });
         let {data} = await axios.post('/apiv1/admin/roles', role);
         console.log(data);
         if(data.ok){
            dispatch({
               type: 'CREATE_ROLE_OK',
               payload: data.resource
            });
            return;
         }
         dispatch({
            type: 'CREATE_ROLE_NOK',
            payload: data.error
         })
      } catch (error) {
         dispatch({
            type: 'CREATE_ROLE_NOK',
            payload: {type: 'CLIENT_ERROR',text:'axios failed'}
         })
      }
   }
   // console.log('creating',role);
   // let { data } = await axios.post('/apiv1/admin/roles', role);
   
   // if(data && data.ok){
   //    return {
   //       type: 'CREATE_ROLE_OK',
   //       payload: data.resource
   //    }
   // }

   // return {
   //    type: 'CREATE_ROLE_NOK',
   //    payload: data.error
   // }

   
}

export default useCreateRole;

