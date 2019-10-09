import {useContext} from 'react';
import axios from '../axios';
import apisFetchPending from './action_creators/apisFetchPending';
import apisFetchOk from './action_creators/apisFetchOk';
import apisFetchNok from './action_creators/apisFetchNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   let {dispatch} = useContext(StateContext);
   return async function(){
      try {
         dispatch(apisFetchPending());
         let {data} = await axios.get('/apiv1/admin/apis');
         if(data.ok){
            dispatch(apisFetchOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(apisFetchNok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }

}