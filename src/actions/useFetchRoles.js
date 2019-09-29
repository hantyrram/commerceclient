import {useContext} from 'react';
import axios from '../axios';
import rolesFetchPending from './action_creators/rolesFetchPending';
import rolesFetchOk from './action_creators/rolesFetchOk';
import rolesFetchNok from './action_creators/rolesFetchNok';
import StateContext from 'contexts/StateContext';

export default ()=>{
   
   let {dispatch} = useContext(StateContext);

   return async function(){
      try {
         dispatch(rolesFetchPending());
         let {data} = await axios.get('/apiv1/admin/roles');
         if(data.ok){
            dispatch(rolesFetchOk(data.resource));
            return;
         }
         dispatch(rolesFetchNok(data.error));
      } catch (error) {
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}