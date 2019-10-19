/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from '../axios';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';
export default ()=>{
   
   let {dispatch} = useContext(StateContext);

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