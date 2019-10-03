import types from '../types';

export default (employee)=> ({type: types.EMPLOYEE_FETCH_OK, payload: employee})