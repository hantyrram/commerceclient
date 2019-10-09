import types from '../types';

export default (error)=> ({type: types.EMPLOYEE_FETCH_NOK,payload:error})