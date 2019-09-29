import axios from '../axios';
import { dispatch } from 'data/store';

export default async ()=>{

   let { data } = await axios.get('/apiv1/admin/apis');

   return {
      type: 'GET_APIS_OK',
      payload: data.resource
   }
}