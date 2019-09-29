import axios from '../axios';
import { dispatch } from 'data/store';

export default async ()=>{

   let { data } = await axios.get('/apiv1/admin/roles');

   return {
      type: 'GET_ROLES_OK',
      payload: data.resource
   }
}