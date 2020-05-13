//api endpoint definitions


import types from './requestTypes';

const actions = Object.getOwnPropertyNames(types).reduce((acc,el)=>{
   acc = {...acc, [`${el}_PENDING`]:`${el}_PENDING`, [`${el}_OK`]:`${el}_OK`, [`${el}_NOK`]:`${el}_NOK` };
   return acc;
},{});

export default actions;