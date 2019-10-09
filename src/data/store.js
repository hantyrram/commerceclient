import React, { useReducer } from 'react';

export default ()=>{
   
   let initialState = {
      identity: null
   };

   return useReducer(function(state,action){
      switch(action.type){
         case 'GET_ROLES': return {...state, roles: action.payload}
         case 'GET_APIS': return {...state, apis: action.payload}
         case 'ADD_ROLE': {
            let roles = Object.assign([],state.roles);
            roles.push(action.payload);
            return {...state, roles};
         }
         default: return state;
      }
   },initialState);
   
 
}