import {useContext} from 'react';
import axios from '../axios';
import StateContext from 'contexts/StateContext';

import employeeAddPending from './action_creators/employeeAddPending';
import employeeAddOk from './action_creators/employeeAddOk';
import employeeAddNok from './action_creators/employeeAddNok';
import { emit } from 'actionEvent';
function useCreateRole(){
   //emit('CREATE_ROLE_BEGIN')
   let { dispatch} = useContext(StateContext);

   return async function(employee){
      try {
         dispatch(employeeAddPending());
         let {data} = await axios.post('/apiv1/employees/empid_manual', employee);
         console.log(data);
         if(data.ok){
            data.resource = 
            dispatch(employeeAddOk(Object.assign(employee,{_id:data.resource._id})));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(employeeAddNok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
   
}

export default useCreateRole;

