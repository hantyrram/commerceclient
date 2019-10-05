import types from '../types';

export default (employee)=> ({type: types.USERACCOUNTS_FETCH_OK, payload: employee})