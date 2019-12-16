import React,{useReducer,useEffect} from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import StateContext from 'contexts/StateContext';
import rootReducer from 'rootReducer';
import App from 'App2';

const STORE_NAME = 'ht-store-x';

class Store{
   constructor(values){
      this.identity = null;
      this.authenticatedUser = null;
      this.lastAction = {  type: 'INIT'  }
      Object.assign(this,{...values});
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
   
   let fromLocalStorage = window.localStorage.getItem(STORE_NAME)? window.localStorage.getItem(STORE_NAME): null;

   let initialState = new Store(JSON.parse(fromLocalStorage || '{}'));

   const [store,dispatch] = useReducer(rootReducer,initialState);

   const getStore = () => store;
   
   useEffect(()=>{
      window.onbeforeunload = ()=>{
         window.localStorage.setItem(STORE_NAME,JSON.stringify(store))
       }
   });


   
   return(
      <StateContext.Provider value={{getStore, dispatch}}>
         <App {...props}/>
      </StateContext.Provider>
   )
}

ReactDOM.render(<AppContainer />, document.getElementById('root'));

