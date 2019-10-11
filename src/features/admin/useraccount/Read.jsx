import React, { useContext,useEffect,useState } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../../feature';
import StateContext from 'contexts/StateContext';
import  useFetchUserAccount from 'actions/useFetchUserAccount';
import ActiveTable from 'components/ActiveTable';
import Dialog from '@material-ui/core/Dialog';

function UserAccountRead({match,location}){
   let fetchUserAccount = useFetchUserAccount();
   let { getStore } = useContext(StateContext);
   let { userAccounts } = getStore();
   let { roles } = getStore();
   let userAccount = (userAccounts || []).find(u => u._owner === match.params.employeeId);
   let [openAddRoleDialog,setOpenAddRoleDialog] = useState(false);

   //Get UserAccount 
   const retrieveUserAccountOnline = ()=>{
      if(!userAccount){
         fetchUserAccount(match.params.employeeId);
      }
   }

   const addRoleDialogCloseHandler = ()=>{
      setOpenAddRoleDialog(false);
   }

   const addRoleClickHandler= ()=>{
      setOpenAddRoleDialog(true);
   }

   const rowSelectHandler = (selected,e)=>{
      console.log(selected);
      setOpenAddRoleDialog(false);
   }

   useEffect(retrieveUserAccountOnline,[userAccount]);


   if(!userAccount){
      return null; //if fetchPending display spinner
   }
   
   const rolesColumnHeaders = [
      { name: 'Role Name'} ,
      { description: 'Description' }
   ]
   return(
      <form id="temporaryCredential" action="#" onSubmit={(e)=>{e.preventDefault()}}>
         <h2>User Account : Employee Id > {userAccount._owner}</h2>
         <hr/>
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
              
               />
         </div>
         <Dialog open={openAddRoleDialog} >
            <ActiveTable 
               data={roles} 
               columnHeaders={rolesColumnHeaders}
               hidden={['_id','permissions']}
               onRowSelect={rowSelectHandler}
            />
            <ul>
               {(roles || []).map(role=>{
                  return <li onClick={rowSelectHandler.bind({},role)}>{role.name}</li>
               })}
            </ul>
            
            <button onClick={addRoleDialogCloseHandler}>Ok</button>
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