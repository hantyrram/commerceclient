import React from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import Feature from 'components/Feature';
import ActiveTable from 'components/ActiveTable';


export default ({history}) => {
   
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




