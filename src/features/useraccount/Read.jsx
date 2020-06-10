import React, { useContext,useEffect,useState } from 'react';

import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import Feature from 'components/Feature';
import ActiveTable from 'components/ActiveTable';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

export default function UserAccountRead({match,location}){
   let { params: { _id } } = match; 

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

   let userAccount = (userAccounts || []).find(u => u._owner === _id);

   let [openAddRoleDialog,setOpenAddRoleDialog] = useState(false);
   //Get UserAccount 
   const retrieveUserAccountOnline = ()=>{
      fetchUserAccount( { params: { useraccountId: _id } }); //useraccountid = employeeid
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
      <Feature title={`User Account : ${_id} (Owner)`}>
         <form id="temporaryCredential" action="#" onSubmit={(e)=>{e.preventDefault()}} className="grid-form">
            <h4>Credential</h4>
            <hr/>
            <div className="form-control">
               <label htmlFor="username">Username</label>
               <input type="text" name="username" value={(userAccount.credential||{}).username} disabled />
            </div >
            <div className="form-control">
               <label htmlFor="password">Temporary</label>
               <input type="text" name="password" value={(userAccount.credential||{}).temp} disabled/>
               <span className="field-description">If true, password MUST be changed before the credential is granted authorization.</span>
            </div >
         </form>
         <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <div style={{display:"inline-block"}}><strong>Roles</strong></div>
            <hr />
            <div style={{display:"inline-block"}}><Button onClick={addRoleClickHandler} variant="outlined" size="small" color="primary"> <AddIcon /> Add Role to User Account</Button></div>
         </div>
         <ActiveTable data={userAccount.roles} 
            columnHeaders={rolesColumnHeaders}
            hidden={['_id','permissions']}
            onRowDelete={onUserAccountRoleDelete}
         />
         <Dialog open={openAddRoleDialog} >
            <ActiveTable 
               data={roles} 
               columnHeaders={rolesColumnHeaders}
               hidden={['_id','permissions']}
               onRowSelect={rolesRowSelectHandler}
            />
         </Dialog>
      </Feature>
      
   )
   
}

