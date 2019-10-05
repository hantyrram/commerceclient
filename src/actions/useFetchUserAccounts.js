/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from '../axios';
import userAccountsFetchPending from './action_creators/userAccountsFetchPending';
import userAccountsFetchOk from './action_creators/userAccountsFetchOk';
import userAccountsFetchNok from './action_creators/userAccountsFetchNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(userAccountsId){
      try {
         dispatch(userAccountsFetchPending());
         let {data} = await axios.get('/apiv1/admin/userAccounts/');
         if(data.ok){
            dispatch(userAccountsFetchOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(userAccountsFetchNok(data.error));
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}