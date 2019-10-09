import types from '../types';

export default (employees)=> ({type: types.EMPLOYEES_FETCH_OK, payload: employees})