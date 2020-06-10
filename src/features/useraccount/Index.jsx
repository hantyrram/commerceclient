import React from 'react';
import { Link } from 'react-router-dom';
import List from './List';
import Feature from 'components/Feature';

export default (props) => {
   const CreateNewUserAccount = (props) => <Link  to="/admin/useraccounts/create" {...props}>Create New User Account</Link> 
   return(
      <Feature title="User Accounts" actions={[<CreateNewUserAccount className="feature-action contained primary" />]}>
         <List {...props}/>
      </Feature>
   )
}