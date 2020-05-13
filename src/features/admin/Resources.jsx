import React, { Component, useContext, useEffect } from 'react';
import axios from 'axios';
import getResources from 'action_creators/getResources';
import EBrowser from 'components/EBrowser';
import useAppStore from 'hooks/useAppStore';
import resourceUISchema from 'uischemas/resource';
import feature from '../feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';

function Resources(props){
     
   let { getAppState,dispatch } = useAppStore();
   
   let { resources } = getAppState() || [];

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