import {useContext} from 'react';
import axios from '../axios';
import employeeEditPending from './action_creators/employeeEditPending';
import employeeEditOk from './action_creators/employeeEditOk';
import employeeEditNok from './action_creators/employeeEditNok';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   let {dispatch} = useContext(StateContext);
   return async function(employee){
      try {
         dispatch(employeeEditPending());
         let {data} = await axios.patch('/apiv1/employees/' + employee._id,employee);
         if(data.ok){
            dispatch(employeeEditOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(employeeEditNok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }

}