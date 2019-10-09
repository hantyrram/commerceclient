import types from '../types';

export default (error)=> ({type: types.EMPLOYEE_ADD_NOK,payload:error})