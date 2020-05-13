//user accounts list is a separate resource, 
//since Employee.UserAccount implies a user account of a particular employee it's better to separate the two
import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';

const userAccountsFetchNok = ()=> ({type: types.USERACCOUNTS_FETCH_PENDING});
const userAccountsFetchNok = (error)=> ({type: types.USERACCOUNTS_FETCH_NOK,payload:error});
const userAccountsFetchOk = userAccounts => ({type: types.USERACCOUNTS_FETCH_OK, payload: userAccounts});

export function useEmployee$UserAccount_List(){
   let {dispatch} = useAppstore();

   return async function(){
      try {
         dispatch(userAccountsFetchPending());
         let {data} = await axios.get('/apiv1/admin/userAccounts/');
         if(data.ok){
            dispatch(userAccountsFetchOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(userAccountsFetchNok(data.error));
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}