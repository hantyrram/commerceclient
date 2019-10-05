import types from '../types';

export default (error)=> ({type: types.EMPLOYEE_EDIT_NOK,payload:error})