/**
 * Fetches All Permissions.
 */

import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from './types';
export const helpers_getCountries_Pending = ()=> ({type: types.HELPERS_GETCOUNTRIES_PENDING});
export const helpers_getCountries_Ok = (countries)=> ({type: types.HELPERS_GETCOUNTRIES_OK, payload: countries});
export const helpers_getCountries_Nok = (error)=> ({type: types.HELPERS_GETCOUNTRIES_NOK,payload: error});




export function useUtil$ExtData$Country_List(){
   let { dispatch } = useAppStore();
   return async function(){
      try {
         dispatch(helpers_getCountries_Pending());
         let {data} = await axios.get('/apiv1/helpers/getCountries');
         if(data){
            dispatch(helpers_getCountries_Ok(data));
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

