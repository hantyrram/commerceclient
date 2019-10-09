import types from '../types';

export default (error)=> ({type: types.ROLE_EDIT_NOK,payload:error})