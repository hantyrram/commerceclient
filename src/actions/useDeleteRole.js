import {useContext} from 'react';
import axios from '../axios';
import roleDeletePending from './action_creators/roleDeletePending';
import roleDeleteOk from './action_creators/roleDeleteOk';
import roleDeleteNok from './action_creators/roleDeleteNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   let {dispatch} = useContext(StateContext);
   return async function(role){
      try {
         dispatch(roleDeletePending());
         let {data} = await axios.delete('/apiv1/admin/roles/' + role._id);
         if(data.ok){
            dispatch(roleDeleteOk(role));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(roleDeleteNok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }

}