import React, { Component, useContext, useEffect } from 'react';
import axios from '../../axios';
import getResources from 'action_creators/getResources';
import EBrowser from 'components/EBrowser';
import StateContext from 'contexts/StateContext';
import resourceUISchema from 'uischemas/resource';
import Feature from 'components/Feature';

function Resources(props){

     
   let { getStore,dispatch } = useContext(StateContext);
   
   let { resources } = getStore() || [];

   useEffect(function(){
      (async ()=>{
         dispatch(await getResources());
      })()
   },[]);

   return(
      <Feature group="Admin / Resources" >
         <EBrowser entities={resources} uischema={resourceUISchema}/>
      </Feature>
   )
}

export default Resources;