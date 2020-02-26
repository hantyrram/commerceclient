import React,{useContext} from 'react';
import AppStore from 'AppStore';

/**
 * Hook to get the App's global state storage.
 */
export default ()=>{
   return useContext(AppStore);
}