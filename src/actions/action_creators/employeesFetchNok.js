import types from '../types';

export default (error)=> ({type: types.EMPLOYEES_FETCH_NOK,payload:error})