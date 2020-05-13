/**
 * Fetches All Permissions.
 */
import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from './types';

const userAccount$Roles_Add_Pending = ()=>({type: types.USERACCOUNT$ROLES_ADD_PENDING});
const userAccount$Roles_Add_Nok = error = ({type: types.USERACCOUNT$ROLES_ADD_NOK,payload: error});
const userAccount$Roles_Add_Ok = role => ({type: types.USERACCOUNT$ROLES_ADD_OK, payload: role});

export const userAccount$Roles_Delete_Pending = ()=> ({type: types.USERACCOUNT$ROLES_DELETE_PENDING});
export const userAccount$Roles_Delete_Ok = (role)=> ({type: types.USERACCOUNT$ROLES_DELETE_OK, payload: role});
export const userAccount$Roles_Delete_Nok = (error)=> ({type: types.USERACCOUNT$ROLES_DELETE_NOK,payload: error});


export function useEmployee$UserAccount$Roles_Add(){
   
   let {dispatch} = useAppstore();

   return async function(username,role){
      try {
         dispatch(userAccount$Roles_Add_Pending());
         console.log(username,role);
         let {data} = await axios.post(`/apiv1/useraccounts/${username}/roles`,role);
         console.log(data);
         if(data.ok){
            dispatch(userAccount$Roles_Add_Ok({username, role: data.resource}));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(userAccount$Roles_Add_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

export function useEmployee$UserAccount$Roles_Delete(){
   
   let {dispatch} = useAppstore();

   return async function(username,role){
      try {
         console.log('Deleting');
         dispatch(userAccount$Roles_Delete_Pending());
         console.log(username,role);
         let {data} = await axios.delete(`/apiv1/useraccounts/${username}/roles/${role._id}`);
         console.log(data);
         if(data.ok){
            dispatch(userAccount$Roles_Delete_Ok({username, role}));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(userAccount$Roles_Delete_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}