import React from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../feature';
import ActiveTable from 'components/ActiveTable';

function UserAccounts({history}){
   
   let { getAppState, dispatch} = useAppState();

   let fetchUserAccounts = useApiRequest('USERACCOUNT_LIST',dispatch, ({responseData})=>{
      return responseData.resource;
   });

   let { userAccounts } = getAppState();

   React.useEffect(()=>{
      fetchUserAccounts();
   },[]);

   
   const onRowClick = (rowData)=>{
      history.push(`/admin/useraccounts/${rowData._owner}`, {state: rowData});
   }

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
