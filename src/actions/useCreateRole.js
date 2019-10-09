import {useContext} from 'react';
import axios from '../axios';
import StateContext from 'contexts/StateContext';

import roleCreatePending from './action_creators/roleCreatePending';
import roleCreateOk from './action_creators/roleCreateOk';
import roleCreateNok from './action_creators/roleCreateNok';
import { emit } from 'actionEvent';
function useCreateRole(){
   //emit('CREATE_ROLE_BEGIN')
   let { dispatch} = useContext(StateContext);

   return async function(role){
      try {
         dispatch(roleCreatePending());
         let {data} = await axios.post('/apiv1/admin/roles', role);
         if(data.ok){
            dispatch(roleCreateOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(roleCreateNok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
   
}

export default useCreateRole;

