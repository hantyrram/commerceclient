import axios from '../axios';
import {emit} from '../actionEvent';

async function getResources(){
   let { data } = await axios.get('/apiv1/admin/resources');
   emit('GET_RESOURCES_OK',data);
   return {
      type: 'GET_RESOURCES_OK',
      payload: data.resource
   }
}
export default getResources;