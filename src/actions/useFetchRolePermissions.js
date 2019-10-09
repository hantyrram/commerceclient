/**
 * Fetch the permissions of the Role identified by it's roleId.
 */

import {useContext} from 'react';
import axios from '../axios';
import rolePermissionsFetchPending from './action_creators/rolePermissionsFetchPending';
import rolePermissionsFetchOk from './action_creators/rolePermissionsFetchOk';
import rolePermissionsFetchNok from './action_creators/rolePermissionsFetchNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';

export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(roleId){
      try {
         dispatch(rolePermissionsFetchPending());
         let {data} = await axios.get(`/apiv1/admin/roles/${roleId}/permissions`);
         if(data.ok){
            dispatch(rolePermissionsFetchOk({_id: roleId, permissions:data.resource}));
            if(data.message){
               emit('message',data.message);
            }
            return data;
         }
         dispatch(rolePermissionsFetchNok(data.error));
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}