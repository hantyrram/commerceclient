import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from './types';
const rolePermissionsFetchNok = error => ({type: types.ROLEPERMISSIONS_FETCH_NOK,payload:error});
const rolePermissionsFetchOk = rolePermissions => ({type: types.ROLEPERMISSIONS_FETCH_OK,payload: rolePermissions});
const rolePermissionsFetchPending = ()=> ({type: types.ROLEPERMISSIONS_FETCH_PENDING});

export function useRole$Permission_List(){
   
   let {dispatch} = useAppStore();

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