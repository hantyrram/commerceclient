import {useContext} from 'react';
import axios from '../axios';
import roleFetchPending from './action_creators/roleFetchPending';
import roleFetchOk from './action_creators/roleFetchOk';
import roleFetchNok from './action_creators/roleFetchNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';

export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(roleId){
      try {
         dispatch(roleFetchPending());
         let {data} = await axios.get('/apiv1/admin/roles/' + roleId);
         if(data.ok){
            console.log(data.resource);
            dispatch(roleFetchOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(roleFetchNok(data.error));
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}