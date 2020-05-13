import React from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../feature';
import ActiveTable from 'components/ActiveTable';

function Roles({history}){
   
   let { getAppState, dispatch} = useAppState();
   let { roles } = getAppState();
   let fetchRoles = useApiRequest('ROLE_LIST',dispatch);
  
   const columnHeaders = [
      { name: 'Role Name' },
      { label: 'Label' },
      { description: 'Description' },
   ]

   React.useEffect(()=>{
      fetchRoles();
   },[]);

   
   const onRowClick = (entity)=>{
      history.push('/admin/roles/' + entity._id, {entity} );
   }
   // onRowClick={ebrowserReadHandler}

   return(
      // <EBrowser uischema={uischema} entities={roles} onRead={ebrowserReadHandler} />   
      <ActiveTable data={roles} columnHeaders={columnHeaders}  onRowClick={onRowClick}/>
   )
   
}

export default feature(Roles,{
   title: 'Roles',
   shortcutLinks: [
      <FeatureShortcutLink to="/admin/roles/create">Create New Role</FeatureShortcutLink>
   ]
})



