import React,{useReducer} from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import StateContext from 'contexts/StateContext';
import rootReducer from 'rootReducer';
import App from 'App2';

class Store{
   constructor(){
      this.identity = null;
      this.authenticatedUser = null;
      this.lastAction = {  type: 'INIT'  }
   }

   getHello(){
      return 'hello';
   }

   getEmployeeById(id){
      if(!this.employees || this.employees.length === 0) return null;
      return this.employees.find(e => e._id === id);
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

