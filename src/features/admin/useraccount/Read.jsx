import React, { useContext,useEffect,useState } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../../feature';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import ActiveTable from 'components/ActiveTable';
import Dialog from '@material-ui/core/Dialog';

function UserAccountRead({match,location}){
   

   let { getAppState,dispatch } = useAppState();
   let fetchUserAccount = useApiRequest('USERACCOUNT_READ',dispatch);
   
   let addRoleToUserAccount = useApiRequest('USERACCOUNT$ROLES_ADD',dispatch,({requestParams,responseData})=>{
      return {username: requestParams.username, role: responseData.resource};
   });

   let deleteRoleFromUserAccount =  
      useApiRequest('USERACCOUNT$ROLES_DELETE',dispatch,({requestParams})=>{
         return {username: requestParams.username, roleId: requestParams.roleId}
      });

   let fetchRoles = useApiRequest('ROLE_LIST',dispatch);

   let { userAccounts,roles } = getAppState();

   let userAccount = (userAccounts || []).find(u => u._owner === match.params.employeeId);

   let [openAddRoleDialog,setOpenAddRoleDialog] = useState(false);
   //Get UserAccount 
   const retrieveUserAccountOnline = ()=>{
      fetchUserAccount( { params: { useraccountId: match.params.employeeId } }); //useraccountid = employeeid
   }

   const onUserAccountRoleDelete = (role)=>{
      console.log(role);
      // deleteRoleFromUserAccount(userAccount.credential.username,role);
      deleteRoleFromUserAccount({
         params: {
            username: userAccount.credential.username,
            roleId: role._id
         }
      });
   }

   const addRoleClickHandler= ()=>{
      fetchRoles();
      setOpenAddRoleDialog(true);
      
   }

   function rolesRowSelectHandler(rowSelected){
      
      if(rowSelected.selected){
         // addRoleToUserAccount(userAccount.credential.username,rowSelected.rowData);
         addRoleToUserAccount({
            params: {
               username: userAccount.credential.username
            },
            payload: rowSelected.rowData
         });
         setOpenAddRoleDialog(false);
      }
      
   }

   useEffect(retrieveUserAccountOnline,[]);
 


   if(!userAccount){
      return null; //if fetchPending display spinner
   }
   
   const rolesColumnHeaders = [
      { name: 'Role Name'} ,
      { description: 'Description' }
   ]
   return(
      <form id="temporaryCredential" action="#" onSubmit={(e)=>{e.preventDefault()}}>
         <h2>User Account</h2>
         <hr/>
         <h4>Owner : {userAccount._owner}</h4>
         <h4>Credential</h4>
         <hr/>
         <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={(userAccount.credential||{}).username} />
         </div>
         <div>
            <label htmlFor="password">Temporary</label>
            <input type="text" name="password" value={(userAccount.credential||{}).temp} />
         </div>
         <h4>Roles </h4><button onClick={addRoleClickHandler}>Add Role</button>
         <hr/>
         <div>
            {/* {JSON.stringify(userAccount.roles,null,2)} */}
            <ActiveTable data={userAccount.roles} 
               columnHeaders={rolesColumnHeaders}
               hidden={['_id','permissions']}
               onRowDelete={onUserAccountRoleDelete}
               />
         </div>
         <Dialog open={openAddRoleDialog} >
            <ActiveTable 
               data={roles} 
               columnHeaders={rolesColumnHeaders}
               hidden={['_id','permissions']}
               onRowSelect={rolesRowSelectHandler}
            />
         </Dialog>
      </form>
   )
   
}


export default feature(UserAccountRead,{
   title: 'User Accounts',
   shortcutLinks: [
      <FeatureShortcutLink to="/admin/useraccounts/create">Create New User Account</FeatureShortcutLink>
   ]
})