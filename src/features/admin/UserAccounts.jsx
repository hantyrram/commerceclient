import React, { useContext,useEffect } from 'react';
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
      fetchUserAccounts();
   },[]);

   
   const onRowClick = (rowData)=>{
      history.push(`/admin/useraccounts/${rowData._owner}`, {state: rowData});
   }

   console.log(userAccounts);

   const columnHeaders = [
      { _owner : 'Owner (Employee Id)'},
      { username: 'Username' },
      { password: 'Password' },
      { temp: 'Is Temporary' }
   ]

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
         columnHeaders={columnHeaders}
         hidden={['roles']}
         
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
