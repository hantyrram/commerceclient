import React, { useContext,useEffect,useState } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../../feature';
import StateContext from 'contexts/StateContext';
import useFetchUserAccount from 'actions/useFetchUserAccount';
import useUserAccount$Roles_Add from 'actions/useUserAccount$Roles_Add';
import useUserAccount$Roles_Delete from 'actions/useUserAccount$Roles_Delete';
import useFetchRoles from 'actions/useFetchRoles';
import ActiveTable from 'components/ActiveTable';
import Dialog from '@material-ui/core/Dialog';

function UserAccountRead({match,location}){
   let fetchUserAccount = useFetchUserAccount();
   let addRoleToUserAccount = useUserAccount$Roles_Add();
   let deleteRoleFromUserAccount = useUserAccount$Roles_Delete();

   let fetchRoles = useFetchRoles();
   let { getStore } = useContext(StateContext);
   let { userAccounts } = getStore();
   let { roles } = getStore();
   let userAccount = (userAccounts || []).find(u => u._owner === match.params.employeeId);
   let [openAddRoleDialog,setOpenAddRoleDialog] = useState(false);
   //Get UserAccount 
   const retrieveUserAccountOnline = ()=>{
      fetchUserAccount(match.params.employeeId);
   }

   const onUserAccountRoleDelete = (role)=>{
      console.log(role);
      deleteRoleFromUserAccount(userAccount.credential.username,role);
   }

   const addRoleClickHandler= ()=>{
      fetchRoles();
      setOpenAddRoleDialog(true);
      
   }

   function rolesRowSelectHandler(rowSelected){
      
      if(rowSelected.selected){
         addRoleToUserAccount(userAccount.credential.username,rowSelected.rowData);
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