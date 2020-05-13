import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from './types';
const roleCreateNok = error => ({type: types.ROLE_CREATE_NOK,payload:error});
const roleCreateOk = roles => ({type: types.ROLE_CREATE_OK,payload: roles});
const roleCreatePending = ()=> ({type: types.ROLE_CREATE_PENDING});
const roleDeleteNok = error => ({type: types.ROLE_DELETE_NOK,payload:error});
const roleDeleteOk = roles => ({type: types.ROLE_DELETE_OK,payload: roles});
const roleDeletePending = ()=> ({type: types.ROLE_DELETE_PENDING});
const roleEditNok = error => ({type: types.ROLE_EDIT_NOK,payload:error});
const roleEditOk = roles => ({type: types.ROLE_EDIT_OK,payload: roles});
const roleEditPending = ()=> ({type: types.ROLE_EDIT_PENDING});
const roleFetchNok = error => ({type: types.ROLE_FETCH_NOK,payload:error});
const roleFetchOk = role => ({type: types.ROLE_FETCH_OK,payload: role});
const roleFetchPending = ()=> ({type: types.ROLE_FETCH_PENDING});
const roleFetchAllNok = error => ({type: types.ROLE_FETCHALL_NOK,payload:error});
const roleFetchAllOk = role => ({type: types.ROLE_FETCHALL_OK,payload: role});
const roleFetchAllPending = ()=> ({type: types.ROLE_FETCHALL_PENDING});

export function useRole_Create(){
   let { dispatch} = useAppstore();
   return async function(role){
      try {
         dispatch(roleCreatePending());
         let {data} = await axios.post('/apiv1/admin/roles', role);
         if(data.ok){
            dispatch(roleCreateOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(roleCreateNok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
   
}

export function useRole_Delete (){

   let {dispatch} = useAppstore();

   return async function(role){
      try {
         dispatch(roleDeletePending());
         let {data} = await axios.delete('/apiv1/admin/roles/' + role._id);
         if(data.ok){
            dispatch(roleDeleteOk(role));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(roleDeleteNok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }

}

export function useRole_Edit(){
   let {dispatch} = useAppstore();
   return async function(role){
      try {
         dispatch(roleEditPending());
         let {data} = await axios.patch('/apiv1/admin/roles/' + role._id,role);
         if(data.ok){
            dispatch(roleEditOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(roleEditNok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }

}

export function useRole_Read(){
   
   let {dispatch} = useAppstore();

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


export function useRole_List(){
   
   let {dispatch} = useAppstore();

   return async function(){
      try {
         dispatch(roleFetchAllPending());
         let {data} = await axios.get('/apiv1/admin/roles');
         if(data.ok){
            dispatch(roleFetchAllOk(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data;
         }
         dispatch(roleFetchAllNok(data.error));
         emit('error',data.error);

      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}


