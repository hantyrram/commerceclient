import StateContext from 'contexts/StateContext';
import {useContext} from 'react';


export default ()=>{
   let { getStore } = useContext(StateContext);
   return getStore().lastAction;
}