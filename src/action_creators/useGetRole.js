import React,{useContext} from 'react';
import axios from '../axios';
import StateContext from 'contexts/StateContext';

function useGetRole(){
   //emit('CREATE_ROLE_BEGIN')
   let {dispatch}= useContext(StateContext);

   return async function(roleId){
      try {
         dispatch({
            type:'FETCH_ROLE_PENDING'
         });
         let {data} = await axios.get('/apiv1/admin/roles/'+roleId);
         console.log(data);
         if(data.ok){
            dispatch({
               type: 'FETCH_ROLE_OK',
               payload: data.resource
            });
            return;
         }
         dispatch({
            type: 'FETCH_ROLE_NOK',
            payload: data.error
         })
      } catch (error) {
         dispatch({
            type: 'FETCH_ROLE_NOK',
            payload: {type: 'CLIENT_ERROR',text:'axios failed'}
         })
      }
   }
}

export default useGetRole;

