import React, { useContext,useEffect } from 'react';
import uischema from 'uischemas/api';
import EBrowser from 'components/EBrowser';
import StateContext from 'contexts/StateContext';
import useFetchApis from 'actions/useFetchApis';
import Feature from 'components/Feature';

export default (props)=>{
   let { getStore } = useContext(StateContext);
   let fetchApis = useFetchApis();
   let {apis} = getStore();
   useEffect(()=>{
      if(!apis || apis.length === 0){ // or stale
         fetchApis();
      }
   },[]);

   return(
      <Feature group="Admin / Apis" >

        <EBrowser uischema={uischema} entities={apis}  />    
      
      </Feature>
   )
   
}


