import types from '../types';

export default (error)=> ({type: types.USERACCOUNT$CREDENTIAL_CREATE_NOK,payload:error})