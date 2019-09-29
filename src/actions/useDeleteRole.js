import {useContext} from 'react';
import axios from '../axios';
import roleDeletePending from './action_creators/roleDeletePending';
import roleDeleteOk from './action_creators/roleDeleteOk';
import roleDeleteNok from './action_creators/roleDeleteNok';
import StateContext from 'contexts/StateContext';

export default ()=>{
   let {dispatch} = useContext(StateContext);
   return async function(role){
      try {
         dispatch(roleDeletePending());
         let {data} = await axios.delete('/apiv1/admin/roles/' + role._id);
         if(data.ok){
            dispatch(roleDeleteOk(role));
            return;
         }
         dispatch(roleDeleteNok(data.error));
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }

}