import {useContext} from 'react';
import axios from '../axios';
import roleEditPending from './action_creators/roleEditPending';
import roleEditOk from './action_creators/roleEditOk';
import roleEditNok from './action_creators/roleEditNok';
import StateContext from 'contexts/StateContext';

export default ()=>{
   let {dispatch} = useContext(StateContext);
   return async function(role){
      try {
         dispatch(roleEditPending());
         let {data} = await axios.patch('/apiv1/admin/roles/' + role._id,role);
         if(data.ok){
            dispatch(roleEditOk(data.resource));
            return;
         }
         dispatch(roleEditNok(data.error));
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }

}