import React, { useContext,useEffect } from 'react';
import uischema from 'uischemas/role';
import EBrowser from 'components/EBrowser';
import StateContext from 'contexts/StateContext';
import useFetchRoles from 'actions/useFetchRoles';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../feature';
function Roles({history}){
   
   let { getStore} = useContext(StateContext);
   let { roles } = getStore();
   let fetchRoles = useFetchRoles();

   useEffect(()=>{
      fetchRoles();
   },[]);

   
   const ebrowserReadHandler = (entity)=>{
      history.push('/admin/roles/' + entity._id, {entity} );
   }

   return(
      <EBrowser uischema={uischema} entities={roles} onRead={ebrowserReadHandler} />   
   )
   
}

export default feature(Roles,{
   title: 'Roles',
   shortcutLinks: [
      <FeatureShortcutLink to="/admin/roles/create">Create New Role</FeatureShortcutLink>
   ]
})



