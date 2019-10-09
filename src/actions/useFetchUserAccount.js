/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from '../axios';
import userAccountFetchPending from './action_creators/userAccountFetchPending';
import userAccountFetchOk from './action_creators/userAccountFetchOk';
import userAccountFetchNok from './action_creators/userAccountFetchNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(employeeId){
      try {
         dispatch(userAccountFetchPending());
         let {data} = await axios.get('/apiv1/admin/userAccounts/' + employeeId);
         if(data.ok){
            dispatch(userAccountFetchOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(userAccountFetchNok(data.error));
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}