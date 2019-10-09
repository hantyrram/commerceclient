import types from '../types';

export default (error)=> ({type: types.APIs_FETCH_NOK,payload:error})