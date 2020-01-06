/**
 * Fetches All Permissions.
 */

import {useContext} from 'react';
import axios from 'axios';
import {
   helpers_getCountries_Nok,
   helpers_getCountries_Ok,
   helpers_getCountries_Pending
} from './action_creators/helpers';

import useStateContext from 'hooks/useStateContext';
import { emit } from 'actionEvent';
export const useGetCountries = ()=>{
   let { dispatch } = useStateContext();
   return async function(){
      try {
         dispatch(helpers_getCountries_Pending());
         let {data} = await axios.get('/apiv1/helpers/getCountries');
         console.log(data);
         if(data){
            dispatch(helpers_getCountries_Ok(data));
          
            return data.resource;
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