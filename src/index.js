import React,{useReducer,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import './Mui.css';
import Store from 'appstore/AppStoreContext';
import useAppStore,{ STORE_NAME } from 'appstore/useAppStore';
import App from 'App';
const Login = React.lazy(()=> import(/*webpackChunkName: "feature.auth.login" */'features/auth/Login'));

const AppContainer = (props)=>{
     
   
   const [state,dispatch] = useAppStore();

   const getAppState = () => state;

   useEffect(()=>{

      window.onbeforeunload = (e)=>{    
         //remove existing data
         window.sessionStorage.removeItem(STORE_NAME);     
         //store the state on sessionStorage
         window.sessionStorage.setItem(STORE_NAME,JSON.stringify(state));
         //store the last path the user was on before refresing the page
         window.sessionStorage.setItem("LAST_VISITED_PATH_BEFORE_RELOAD",window.location.pathname);

      }

   })

   useEffect(()=>{
      console.log('reloaded');
      //hyrdrate the appstore state from sessionStorage
      // if(window.sessionStorage.getItem(STORE_NAME) && Boolean(window.sessionStorage.getItem("RELOADED"))){
      //    dispatch({type:'INIT',payload: JSON.parse(window.sessionStorage.getItem(STORE_NAME))});
      // }
   },[]);

   
   return(
      <Store.Provider value={{getAppState, dispatch}}>
         <App {...props}/>
      </Store.Provider>
   )
}

ReactDOM.render(<AppContainer />, document.getElementById('root'));

