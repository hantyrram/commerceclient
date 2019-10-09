/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from '../axios';
import permissionsFetchPending from './action_creators/permissionsFetchPending';
import permissionsFetchOk from './action_creators/permissionsFetchOk';
import permissionsFetchNok from './action_creators/permissionsFetchNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(permissionsId){
      try {
         dispatch(permissionsFetchPending());
         let {data} = await axios.get('/apiv1/admin/permissions/');
         if(data.ok){
            dispatch(permissionsFetchOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(permissionsFetchNok(data.error));
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}