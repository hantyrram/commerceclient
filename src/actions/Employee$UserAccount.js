import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from './types';
const userAccountFetchPending = ()=> ({type: types.USERACCOUNT_FETCH_PENDING});
const userAccountFetchNok = error => ({type: types.USERACCOUNT_FETCH_NOK,payload:error});
const userAccountFetchOk = (employee)=> ({type: types.USERACCOUNT_FETCH_OK, payload: employee});

export function useEmployee$UserAccount_Read (){
   
   let {dispatch} = useAppStore();

   return async function(employeeId){
      try {
         dispatch(userAccountFetchPending());
         let {data} = await axios.get('/apiv1/admin/userAccounts/' + employeeId);
         if(data.ok){
            dispatch(userAccountFetchOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(userAccountFetchNok(data.error));
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

