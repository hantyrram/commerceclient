import React, { Component, useContext, useEffect } from 'react';
import axios from '../../axios';
import getResources from 'action_creators/getResources';
import EBrowser from 'components/EBrowser';
import StateContext from 'contexts/StateContext';
import resourceUISchema from 'uischemas/resource';
import feature from 'features/feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';

function Resources(props){
     
   let { getStore,dispatch } = useContext(StateContext);
   
   let { resources } = getStore() || [];

   useEffect(function(){
      (async ()=>{
         dispatch(await getResources());
      })()
   },[]);

   return(
      // <Feature group="Admin / Resources" >
         
      // </Feature>
      <EBrowser entities={resources} uischema={resourceUISchema}/>
   )
}

export default feature(Resources,{
   title: 'Admin / Resources'
});