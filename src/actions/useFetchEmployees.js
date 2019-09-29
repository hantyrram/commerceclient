import {useContext} from 'react';
import axios from '../axios';
import employeesFetchPending from './action_creators/employeesFetchPending';
import employeesFetchOk from './action_creators/employeesFetchOk';
import employeesFetchNok from './action_creators/employeesFetchNok';
import StateContext from 'contexts/StateContext';

export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(){
      try {
         dispatch(employeesFetchPending());
         let {data} = await axios.get('/apiv1/employees');
         if(data.ok){
            console.log(data.resource);
            dispatch(employeesFetchOk(data.resource));
            return data.resource;
         }
         dispatch(employeesFetchNok(data.error));
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}