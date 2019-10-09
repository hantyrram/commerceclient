import types from '../types';

export default (error)=> ({type: types.USERACCOUNT_FETCH_NOK,payload:error})