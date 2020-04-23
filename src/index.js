import React,{useReducer,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import './Mui.css';
import Store from 'appstore/AppStoreContext';
import useAppStore,{ STORE_NAME } from 'appstore/useAppStore';
import App from 'App';

const AppContainer = (props)=>{
     
   
   const [state,dispatch] = useAppStore();

   const getAppState = () => state;

   useEffect(()=>{

      window.onbeforeunload = (e)=>{    
         // window.localStorage.removeItem(STORE_NAME);     
         window.localStorage.setItem(STORE_NAME,JSON.stringify(state));
      }

   })

   useEffect(()=>{
      console.log('reloaded');
      dispatch({type:'INIT',payload: JSON.parse(window.localStorage.getItem(STORE_NAME))});
      // dispatch({type:'INIT',payload: {}});
   },[]);

   
   return(
      <Store.Provider value={{getAppState, dispatch}}>
         <App {...props}/>
      </Store.Provider>
   )
}

ReactDOM.render(<AppContainer />, document.getElementById('root'));

