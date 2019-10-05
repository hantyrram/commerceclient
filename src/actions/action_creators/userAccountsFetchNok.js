import types from '../types';

export default (error)=> ({type: types.USERACCOUNTS_FETCH_NOK,payload:error})