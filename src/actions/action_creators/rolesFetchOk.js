import types from '../types';

export default (roles)=> ({type: types.ROLES_FETCH_OK, payload: roles})