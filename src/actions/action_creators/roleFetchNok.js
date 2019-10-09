import types from '../types';

export default (error)=> ({type: types.ROLE_FETCH_NOK,payload: error})