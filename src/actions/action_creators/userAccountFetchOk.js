import types from '../types';

export default (employee)=> ({type: types.USERACCOUNT_FETCH_OK, payload: employee})