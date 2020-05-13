/**
 * Fetches All Permissions.
 */

import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from './types';
export const helpers_getStates_Pending = ()=> ({type: types.HELPERS_GETSTATES_PENDING});
export const helpers_getStates_Ok = (states)=> ({type: types.HELPERS_GETSTATES_OK, payload: states});
export const helpers_getStates_Nok = (error)=> ({type: types.HELPERS_GETSTATES_NOK,payload: error});


export function useUtil$ExtData$CountryStates_List(){
   let { dispatch } = useAppStore();
   return async function(country){
      console.log(country)
      try {
         dispatch(helpers_getStates_Pending());
         let {data} = await axios.get(`/apiv1/helpers/getStates/${country || ''}`);
         console.log(data);
         if(data){
            dispatch(helpers_getStates_Ok(data));
            return data;
         }
         // dispatch(helpers_getCountries_Nok());
         // emit('error',{type:'SERVER_ERROR',text:'Axios Error!'}

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}