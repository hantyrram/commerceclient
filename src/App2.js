import React from 'react';
import Styled from 'styled-components';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import EmployeeAdd from 'features/employees/EmployeeAdd';
import EmployeeView from 'features/employees/EmployeeView';
import Employees from 'features/employees';
import CredentialCreate from 'features/access_control/credentials/CredentialCreate';
import CredentialView from 'features/access_control/credentials/CredentialView';
import Credentials from 'features/access_control/credentials';
import RoleCreate from 'features/access_control/roles/RoleCreate';
import RoleView from 'features/access_control/roles/RoleView';
import RolePermissions from 'features/access_control/roles/RolePermissions';
import Roles from 'features/access_control/roles';
import PermissionView from 'features/access_control/permissions/PermissionView';
import Permissions from 'features/access_control/permissions';
import './App.css';


const Page = Styled.div`
   width : 100%;
   min-height:100vh;
   display:flex;
   justify-content:space-evenly;
   flow-direction:row;
   
`;

const LeftSection = Styled.div`
   width: 25%;
   min-height: 100%;
   border: 1px solid red;
   display:inline-block;
`;

const RightSection = Styled.div`
   width:70%;
   // min-height: 100%;
   border: 1px solid green;
   display:inline-block;
   vertical-align: top;
`;

const Header = Styled.div`
   min-height: 5em;
`

const FeatureUiContainer = Styled.div`
   background-color: white;
   box-shadow:-1px -1px 5px rgba(0,0,0, 0.20),1px 1px 5px rgba(0,0,0,.19);
`

export default (props)=>{
   return(
      <Router>
         <Page>
            <LeftSection >
               <ul>
                  <li>Personnel Management
                     <ul>
                        <Link to="/employees">Employees</Link>
                     </ul>
                     <ul>
                        <Link to="/credentials">Credentials</Link>
                     </ul>
                     <ul>
                        <Link to="/roles">Roles</Link>
                     </ul>
                     <ul>
                        <Link to="/permissions">Permissions</Link>
                     </ul>
                  </li>
               </ul>
            </LeftSection>
            <RightSection>
               <Header>Header</Header>
               <FeatureUiContainer>
                  <Switch>
                     <Route exact path="/employees/add" render={(props)=><EmployeeAdd {...props} type="manual"/>}/>
                     <Route path="/employees/:id" component={EmployeeView} />
                     <Route exact path="/employees" component={Employees}/>
                     
                     <Route exact path="/credentials/create" component={CredentialCreate}/>
                     <Route path="/credentials/:username" component={CredentialView} />
                     <Route exact path="/credentials" component={Credentials}/>

                     <Route exact path="/roles/create" component={RoleCreate}/>
                     
                     <Route exact path="/roles/:id" component={RoleView} />
                     <Route exact path="/roles/:id/permissions" component={RolePermissions}/> 
                     <Route exact path="/roles" component={Roles}/> 

                     <Route exact path="/permissions" component={Permissions}/> 
                     <Route exact path="/permissions/:name" component={PermissionView}/> 
                  </Switch>
               </FeatureUiContainer>
            </RightSection>
         </Page>
      </Router>
   )
}
