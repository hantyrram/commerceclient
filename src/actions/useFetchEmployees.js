import {useContext} from 'react';
import axios from '../axios';
import employeesFetchPending from './action_creators/employeesFetchPending';
import employeesFetchOk from './action_creators/employeesFetchOk';
import employeesFetchNok from './action_creators/employeesFetchNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(){
      try {
         dispatch(employeesFetchPending());
         let {data} = await axios.get('/apiv1/employees');
         if(data.ok){
            dispatch(employeesFetchOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }

         dispatch(employeesFetchNok({error: data.error}));
         emit('error',data.error);
      } catch (error) {
         dispatch({error: {type:'CLIENT_ERROR',text:'Axios Error!'}});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}