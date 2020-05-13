import { useReducer,useEffect } from "react";
import reducer from './reducer';

export const STORE_NAME = 'ht-state-x';

const appInitialState = {
   identity: null,
   authenticatedUser: null,
   lastAction: { type: 'INIT' }
}

export default (init)=>{
   
   let [state,dispatch] = useReducer(reducer,appInitialState);

   return [state,dispatch];
}

