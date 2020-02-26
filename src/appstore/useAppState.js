import {useContext} from 'react';
import AppStoreContext from './AppStoreContext';

/**
 * Hook to get the App's global state storage. This should be used by AppStoreContext consumers.
 */
export default ()=>{
   return useContext(AppStoreContext);
}