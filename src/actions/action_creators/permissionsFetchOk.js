import types from '../types';

export default (roles)=> ({type: types.PERMISSIONS_FETCH_OK,payload: roles})