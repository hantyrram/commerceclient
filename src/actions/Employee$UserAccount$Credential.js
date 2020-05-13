import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from '../types';

const userAccountCredentialCreateNok = error => ({type: types.USERACCOUNT$CREDENTIAL_CREATE_NOK,payload:error})
const userAccountCredentialCreateOk= credential =>  ({type: types.USERACCOUNT$CREDENTIAL_CREATE_OK,payload: credential})
const userAccountCredentialCreateOk= () =>  ({type: types.USERACCOUNT$CREDENTIAL_CREATE_PENDING});

export function useEmployee$UserAccount$Credential_Create(){
   
   let {dispatch} = useAppstore();

   return async function(employee,credential){
      
      try {
         let {data} = await axios.post(`/apiv1/employees/${employee._id}/useraccount/credential`,credential);
         console.log(data);
         if(data.ok){
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         emit('error',data.error);
         return;
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

export function useEmployee$UserAccount$Credential_Generate(){
   
   let {dispatch} = useAppstore();

   return async function(employeeId){
      try {
         let {data} = await axios.post('/apiv1/employees/useraccount/credential/generate',{employeeId});
         if(data.ok){
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}