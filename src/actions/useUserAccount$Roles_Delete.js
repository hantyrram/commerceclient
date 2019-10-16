/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from '../axios';
import { 
   userAccount$Roles_Delete_Pending,
   userAccount$Roles_Delete_Ok,
   userAccount$Roles_Delete_Nok
} from './action_creators/userAccount$Roles_Delete';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

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