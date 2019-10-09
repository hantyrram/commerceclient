import types from '../types';

export default (error)=> ({type: types.PERMISSIONS_FETCH_NOK,payload:error})