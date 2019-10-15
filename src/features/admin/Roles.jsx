import React, { useContext,useEffect } from 'react';
import uischema from 'uischemas/role';
import EBrowser from 'components/EBrowser';
import StateContext from 'contexts/StateContext';
import useFetchRoles from 'actions/useFetchRoles';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';

export default ({history})=>{
   
   let { getStore} = useContext(StateContext);

   let fetchRoles = useFetchRoles();

   useEffect(()=>{
      if(!getStore().roles){//or roles is stale
         fetchRoles();
      }
   },[]);

   
   const ebrowserReadHandler = (entity)=>{
      history.push('/admin/roles/'+entity._id,{entity});
   }

   return(
      <Feature group="Roles" featureShortcuts={[<FeatureShortcutLink to="/admin/roles/create">Create Role</FeatureShortcutLink>]}>
        <EBrowser uischema={uischema} entities={getStore().roles} onRead={ebrowserReadHandler} />    
      </Feature>
   )
   
}


