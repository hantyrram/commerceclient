import {useContext} from 'react';
import axios from '../axios';
import employeeFetchPending from './action_creators/employeeFetchPending';
import employeeFetchOk from './action_creators/employeeFetchOk';
import employeeFetchNok from './action_creators/employeeFetchNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(id){
      console.log(id);
      try {
         dispatch(employeeFetchPending());
         let {data} = await axios.get('/apiv1/employees/' + id);
         if(data.ok){
            dispatch(employeeFetchOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(employeeFetchNok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}