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
   background-color: #7f4abe;
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

   return(
      error ? 
      <div> {error.text} </div> : null
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



   return(
      message ? 
      <div> {message.text} </div> : null
   )
}



export default (FeatureComponent,options)=>{

   return (props)=>{

      let [message,setMessage] = useState(null);

      let [error,setError] = useState(null);

      useEffect(()=>{
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
            {/* <ErrorBox />
            <MessageBox /> */}
            <FeatureComponent {...props} />
         </Feature>
      )
   }
}