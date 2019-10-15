/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from '../axios';
import userAccount$Roles_Add_Pending from './action_creators/userAccount$Roles_Add_Pending';
import userAccount$Roles_Add_Ok from './action_creators/userAccount$Roles_Add_Ok';
import userAccount$Roles_Add_Nok from './action_creators/userAccount$Roles_Add_Nok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

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