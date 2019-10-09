import types from '../types';

export default (error)=> ({type: types.ROLE_DELETE_NOK,payload:error})