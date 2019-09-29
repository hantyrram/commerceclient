import React,{useReducer} from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import StateContext from './contexts/StateContext';
import rootReducer from './rootReducer';
import App from './App2';

class Store{
   constructor(){
      this.identity = null;
      this.lastAction = {
         type: 'INIT'
      }
   }

   findRoleById(roleId){
      if(!this.roles || this.roles.length < 1){
         return null
      }
      return this.roles.find(role=>role._id === roleId);
   }
}


const AppContainer = (props)=>{

   let initialState = new Store();

   const [store,dispatch] = useReducer(rootReducer,initialState);

   const getStore = () => store;
   
   return(
      <StateContext.Provider value={{getStore, dispatch}}>
         <App {...props}/>
      </StateContext.Provider>
   )
}

ReactDOM.render(<AppContainer />, document.getElementById('root'));

