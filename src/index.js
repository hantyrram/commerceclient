import React,{useReducer,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App2.css';
import Store from 'appstore/AppStoreContext';
import useAppStore,{ STORE_NAME } from 'appstore/useAppStore';
import App from 'App';

const AppContainer = (props)=>{
     
   
   const [state,dispatch] = useAppStore();

   const getAppState = () => state;

   useEffect(()=>{
      window.onbeforeunload = ()=>{         
         window.localStorage.setItem(STORE_NAME,JSON.stringify(state))
       }
   });

   useEffect(()=>{
      console.log('reloaded');
      dispatch({type:'INIT',payload:JSON.parse(window.localStorage.getItem(STORE_NAME))});
   },[]);

   
   return(
      <Store.Provider value={{getAppState, dispatch}}>
         <App {...props}/>
      </Store.Provider>
   )
}

ReactDOM.render(<AppContainer />, document.getElementById('root'));

