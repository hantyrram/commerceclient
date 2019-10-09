import StateContext from 'contexts/StateContext';
import {useContext} from 'react';


export default (id)=>{
   let { getStore } = useContext(StateContext);
   return (getStore().employees || []).find(e=>e._id === id);
}