
import React, { useState, useEffect } from 'react';
import { subscribe } from 'actionEvent';
import Button from '@material-ui/core/Button';
import './Feature.css';


let style = {
   margin: "1em",
   padding: ".5em"
}

export const ErrorBox = ({error})=>{

   let errStyle = {
      ...style,
      padding: ".5em",
      marginBottom: ".5em",
      backgroundColor: "#ffd7dc",
      color: "#790d0d"
   }
   
   return(
      error ? 
      <div style={errStyle}> {error.text} </div> : null
   )
}

const MessageBox = ({message})=>{

   
   let msgStyle = {
      ...style,
   }

   switch(message.type){
      case 'SUCCESS': 
      msgStyle = {
            ...msgStyle, 
            backgroundColor: "#cff1d0",
            colort: "#024a0e"
         }
      break;
      case 'WARNING': 
      msgStyle = {
            ...msgStyle, 
            backgroundColor: "#f3dfca",
            colort: "#63220e"
         }
      break;
      default: {
         msgStyle = {
            ...msgStyle, 
            backgroundColor: "#e1f7f9",
            colort: "#0c4356"
         }
      }
   }

   return(
      message ? 
      <div style={msgStyle}> {message.text} </div> : null
   )
}

export default ({title,actions,children}) => {

   let [message,setMessage] = useState(null);

   let [error,setError] = useState(null);

   let [pendingMsg,setPendingMsg] = useState(null); //create a spinner

   useEffect(()=>{
      let unsubscribeToPending = subscribe('pending',function(pendingMsg){
         setMessage(null);            
         setError(null);
      });
      let unsubscribeToMessage = subscribe('message',function(msg){
         setMessage(msg);
         setError(null);
      });

      let unsubsrcibeToError = subscribe('error',function(err){
         setError(err);
         setMessage(null);
      });

      return ()=>{
         unsubscribeToPending();
         unsubscribeToMessage();
         unsubsrcibeToError();
      };

   },[])

   useEffect(()=>{
      setMessage(null);
   },[window.location.pathname]);

   useEffect(()=>{
      setError(null);
   },[window.location.pathname]);

   return(
      <div className="feature">            
         {/* <div className={options && options.type === 'context'? `feature-header feature-context-header`: "feature-header feature-main-header"}> */}
         <div className="feature-header">
            {/* <div className={options && options.type === 'context'? `feature-title feature-context-title`: "feature-header feature-main-title"}>{options && options.title}</div> */}
            <div className="feature-title">
               <div className="title">{title}</div>
               <div className="feature-actions">
                  {
                     actions && actions.map( Action => Action )
                  }
               </div>
            </div>
           
         </div>
         {
            message? <MessageBox message={message}/>: null
         }
         {
            error? <ErrorBox error={error}/> : null
         }
         <div className="feature-content">
            {children}
         </div>
         
      </div>
   )
}

