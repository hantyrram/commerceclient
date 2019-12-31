//HOC, wraps all features
import React, { useState,useContext, useEffect } from 'react';
import Styled from 'styled-components';
import StateContext from 'contexts/StateContext';
import { subscribe } from '../actionEvent';

const Wrapper = Styled.div`
 min-height: 100%;
 min-width:100%;
 height:inherit;
 background-color: white;
`

const Header = Styled.div`
   height: 3em;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding: 0 .5em 0 .5em;
   background-color: #373e55;
   color: #f2ebeb;
`
const Content = Styled.div`
  padding: 1em;
`
const FeatureShortcuts = Styled.div`

`
const AlertBox = Styled.div`
   border: 1px solid grey;
`
/**
 * A Feature wrapper.
 */
function Feature(props){
   return (
      <Wrapper>
         <Header>
            {props.title}
            {props.group} {props.feature ? `/ ${props.feature}` : null}
            <FeatureShortcuts>{props.featureShortcuts ? props.featureShortcuts.map(FS=>FS):null}</FeatureShortcuts>
         </Header>   
         <Content>
        
         {props.children}
         </Content>
      </Wrapper>
   )
}

const ErrorBox = ({error})=>{

   // let [error,setError] = useState(null);

   // useEffect(()=>{
   //    let unsubsrcibe = subscribe('error',function(err){
   //       console.log(err);
   //       setError(err);
   //    });
   //    return unsubsrcibe;
   // },[])

   let style = {
      padding: ".5em",
      marginBottom: ".5em",
      backgroundColor: "#ffd7dc",
      color: "#790d0d"
   }

   return(
      error ? 
      <div style={style}> {error.text} </div> : null
   )
}

const MessageBox = ({message})=>{

   // let [message,setMessage] = useState(null);

   // useEffect(()=>{
   //    let unsubscribe = subscribe('message',function(msg){
   //       setMessage(msg);
   //    });

   //    return unsubscribe;
   // },[])
   let style = {
      padding: ".5em",
      marginBottom: ".5em"
   }

   switch(message.type){
      case 'SUCCESS': 
         style = {
            ...style, 
            backgroundColor: "#cff1d0",
            colort: "#024a0e"
         }
      break;
      case 'WARNING': 
         style = {
            ...style, 
            backgroundColor: "#f3dfca",
            colort: "#63220e"
         }
      break;
      default: {
         style = {
            ...style, 
            backgroundColor: "#e1f7f9",
            colort: "#0c4356"
         }
      }
   }

   return(
      message ? 
      <div style={style}> {message.text} </div> : null
   )
}



export default (FeatureComponent,options)=>{

   return (props)=>{

      let [message,setMessage] = useState(null);

      let [error,setError] = useState(null);

      let [pendingMsg,setPendingMsg] = useState(null); //create a spinner

      useEffect(()=>{
         let unsubscribeToPending = subscribe('pending',function(pendingMsg){
            setMessage(null);            
            setError(null);
         });
         let unsubscribeToMessage = subscribe('message',function(msg){
            console.log(msg);
            setMessage(msg);
            setError(null);
         });
   
         let unsubsrcibeToError = subscribe('error',function(err){
            console.log(err);
            setError(err);
            setMessage(null);
         });

         return ()=>{
            unsubscribeToPending();
            unsubscribeToMessage();
            unsubsrcibeToError();
         };

      },[])


      return(
         <Feature title={(options || {}).title} featureShortcuts={(options || {}).shortcutLinks}>
            {
               message? <MessageBox message={message}/>: null
            }
            {
               error? <ErrorBox error={error}/> : null
            }
            {/* //Loader Here */}
            <FeatureComponent {...props} />
         </Feature>
      )
   }
}