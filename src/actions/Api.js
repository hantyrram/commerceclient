/**
 * Fetches All Permissions.
 */
import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from './types';
const apis_Fetch_Pending = ()=> ({type: types.APIS_FETCH_PENDING});
const apis_Fetch_Ok = (apis)=> ({type: types.APIS_FETCH_OK, payload: apis});
const apis_Fetch_Nok = (error)=> ({type: types.APIS_FETCH_NOK,payload: error});

export function useApi_List(){
   let {dispatch} = useAppStore();
   return async function(){
      try {
         dispatch(apis_Fetch_Pending());
         let {data} = await axios.get(`/apiv1/admin/apis`);
         if(data.ok){
            dispatch(apis_Fetch_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(apis_Fetch_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}