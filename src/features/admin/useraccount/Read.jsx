import React, { useContext,useEffect } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../../feature';
import StateContext from 'contexts/StateContext';
import  useFetchUserAccount from 'actions/useFetchUserAccount';
import ActiveTable from 'components/ActiveTable';

function UserAccountRead({match,location}){
   let fetchUserAccount = useFetchUserAccount();
   let { getStore } = useContext(StateContext);
   let { userAccounts } = getStore();
   let userAccount = (userAccounts || []).find(u => u._owner === match.params.employeeId);

   //Get UserAccount 
   const retrieveUserAccountOnline = ()=>{
      if(!userAccount){
         fetchUserAccount(match.params.employeeId);
      }
   }

   useEffect(retrieveUserAccountOnline,[userAccount]);


   if(!userAccount){
      return null; //if fetchPending display spinner
   }
   
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
         <h4>Roles</h4>
         <hr/>
         <div>
            {/* {JSON.stringify(userAccount.roles,null,2)} */}
            <ActiveTable data={userAccount.roles} 
               columnHeaders={[
                  {name: 'Role Name'},
                  {description: 'Description'}
               ]}
               hidden={['_id','permissions']}/>
         </div>
       
      </form>
   )
   
}


export default feature(UserAccountRead,{
   title: 'User Accounts',
   shortcutLinks: [
      <FeatureShortcutLink to="/admin/useraccounts/create">Create New User Account</FeatureShortcutLink>
   ]
})