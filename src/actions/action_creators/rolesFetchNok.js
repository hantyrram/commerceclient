import types from '../types';

export default (error)=> ({type: types.ROLES_FETCH_NOK,payload:error})