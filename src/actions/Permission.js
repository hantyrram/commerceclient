/**
 * Fetches All Permissions.
 */

import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';

const permissionsFetchPending = () => ({type: types.PERMISSIONS_FETCH_PENDING});
const permissionsFetchOk = roles => ({type: types.PERMISSIONS_FETCH_OK,payload: roles});
const permissionsFetchNok = error => ({type: types.PERMISSIONS_FETCH_NOK,payload:error});

export function usePermission_List(){
   
   let {dispatch} = useAppStore();

   return async function(){
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