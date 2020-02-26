import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';

import types from './types';
 
export const employee_Add_Pending = ()=> ({type: types.EMPLOYEE_ADD_PENDING});
export const employee_Add_Ok = (employee)=> ({type: types.EMPLOYEE_ADD_OK, payload: employee});
export const employee_Add_Nok = (error)=> ({type: types.EMPLOYEE_ADD_NOK,payload: error});

export const employee_FetchAll_Pending = ()=> ({type: types.EMPLOYEE_FETCHALL_PENDING});
export const employee_FetchAll_Ok = (employees)=> ({type: types.EMPLOYEE_FETCHALL_OK, payload: employees});
export const employee_FetchAll_Nok = (error)=> ({type: types.EMPLOYEE_FETCHALL_NOK,payload: error});

export const employee_Edit_Pending = ()=> ({type: types.EMPLOYEE_EDIT_PENDING});
export const employee_Edit_Ok = (employee)=> ({type: types.EMPLOYEE_EDIT_OK, payload: employee});
export const employee_Edit_Nok = (error)=> ({type: types.EMPLOYEE_EDIT_NOK,payload: error});

export const employee_Fetch_Pending = ()=> ({type: types.EMPLOYEE_FETCH_PENDING});
export const employee_Fetch_Ok = (employee)=> ({type: types.EMPLOYEE_FETCH_OK, payload: employee});
export const employee_Fetch_Nok = (error)=> ({type: types.EMPLOYEE_FETCH_NOK,payload: error});

export const employee_Verify_Pending = ()=> ({type: types.EMPLOYEE_VERIFY_PENDING});
export const employee_Verify_Ok = (employee)=> ({type: types.EMPLOYEE_VERIFY_OK, payload: employee});
export const employee_Verify_Nok = (error)=> ({type: types.EMPLOYEE_VERIFY_NOK,payload: error});

export function useEmployee_Add(){
   //emit('CREATE_ROLE_BEGIN')
   let { dispatch} = useAppstore();

   return async function(employee){
      try {
         dispatch(employee_Add_Pending());
         let {data} = await axios.post('/apiv1/employees/empid_manual', employee);
         if(data.ok){
            dispatch(employee_Add_Ok(Object.assign(employee,{_id:data.resource._id})));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(employee_Add_Nok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
   
}

export function useEmployee_Edit(){
   let {dispatch} = useAppstore();
   return async function(employee){
      try {
         dispatch(employee_Edit_Pending());
         let {data} = await axios.patch('/apiv1/employees/' + employee._id,employee);
         if(data.ok){
            dispatch(employee_Edit_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return;
         }
         dispatch(employee_Edit_Nok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }

}

export function useEmployee$Photo_Edit(){
   
   let {dispatch} = useAppstore();

   return async function(employee_id,formData){
      try {
         let {data} = await axios.post(`/apiv1/employees/${employee_id}/photo`,formData);
         console.log(data);
         if(data.ok){
            fetch(`/apiv1/employees/${employee_id}/photo`)
               .then(res=>{return res.blob()})
               .then(blob=>{
                  var photoURL = URL.createObjectURL(blob);
                  console.log(photoURL);
                  dispatch({type: 'EMPLOYEE$PHOTO_EDIT_OK',payload: {_id: employee_id, photo: data.resource,photoURL: photoURL} });
               })
            
            if(data.message){
               // emit('message',data.message);
            }
            return data.resource;
         }
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

export function useEmployee_Fetch(){
   
   let {dispatch} = useAppstore();

   return async function(id){
      console.log(id);
      try {
         dispatch(employee_Fetch_Pending());
         let {data} = await axios.get('/apiv1/employees/' + id);
         if(data.ok){
            dispatch(employee_Fetch_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(employee_Fetch_Nok(data.error));
         emit('error',data.error);
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

export function useEmployee_FetchAll(){
   
   let {dispatch} = useAppstore();

   return async function(){
      try {
         dispatch(employee_FetchAll_Pending());
         let {data} = await axios.get('/apiv1/employees');
         console.log(data);
         if(data.ok){
            dispatch(employee_FetchAll_Ok(data.resource));
            // if(data.message){
            //    emit('message',data.message);
            // }
            return data.resource;
         }

         dispatch(employee_FetchAll_Nok({error: data.error}));
         emit('error',data.error);
      } catch (error) {
         dispatch({error: {type:'CLIENT_ERROR',text:'Axios Error!'}});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

export function useEmployee_Verify(){
   
   let {dispatch} = useAppstore();

   return async function(employeeId){
      try {
         let {data} = await axios.post('/apiv1/employees/verify',{employeeId});
         console.log(data);
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

