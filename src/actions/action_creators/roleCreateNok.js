import types from '../types';

export default (error)=> ({type: types.ROLE_CREATE_NOK,payload:error})