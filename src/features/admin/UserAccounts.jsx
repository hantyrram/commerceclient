import React, { useContext,useEffect } from 'react';
import uischema from 'uischemas/role';
import EBrowser from 'components/EBrowser';
import StateContext from 'contexts/StateContext';
import useFetchUserAccounts from 'actions/useFetchUserAccounts';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../feature';
import ActiveTable from 'components/ActiveTable';

function UserAccounts({history}){
   
   let { getStore} = useContext(StateContext);

   let fetchUserAccounts = useFetchUserAccounts();

   let {userAccounts} = getStore();

   useEffect(()=>{
      if(!getStore().userAccounts){//or roles is stale
         fetchUserAccounts();
      }
   },[]);

   
   const onRowClick = (rowData)=>{
      history.push(`/admin/useraccounts/${rowData._owner}`, {state: rowData});
   }

   console.log(userAccounts);

   return(
      !userAccounts || userAccounts.length === 0 ? 'No Existing User Accounts' : 
      <ActiveTable 
         data={
            userAccounts.reduce(function(acc,element){
                  console.log(element);
                  let { _owner, roles, credential} = element;
                  let { username, password, temp} = credential || {};
                  acc.push({ _owner, username, password, temp, roles: (roles || []).length});
                  return acc;
               },[])
         } 
         columnHeaders={['Owned By (EmployeeId)','Username','Password','Is Temporary','Roles']}
         // hidden={['_id']}
         onRowClick={onRowClick}
   />
   )
   
}



export default feature(UserAccounts,{
   title: 'User Accounts',
   shortcutLinks: [
      <FeatureShortcutLink to="/admin/useraccounts/create">Create New User Account</FeatureShortcutLink>
   ]
})
