import types from '../types';

export default (roles)=> ({type: types.EMPLOYEES_FETCH_OK, payload: roles})