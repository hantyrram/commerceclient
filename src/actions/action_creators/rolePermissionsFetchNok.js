import types from '../types';

export default (error)=> ({type: types.ROLEPERMISSIONS_FETCH_NOK,payload:error})