import React from 'react';
import Styled from 'styled-components';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import EmployeeAdd from 'features/employees/EmployeeAdd';
import EmployeeView from 'features/employees/EmployeeView';
import Employees from 'features/employees';

const Page = Styled.div`
   width : 100%;
   min-height:100vh;
   background-color: #e7ebf2;
   display:flex;
   justify-content:space-evenly;
   flow-direction:row;
   overflow: auto;
`;

const LeftSection = Styled.div`
   width: 30%;
   min-height: 100%;
   border: 1px solid red;
   display:inline-block;
`;

const RightSection = Styled.div`
   width:65%;
   // min-height: 100%;
   border: 1px solid green;
   display:inline-block;
   vertical-align: top;
`;

const Header = Styled.div`
   min-height: 10%;
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
                  </Switch>
               </FeatureUiContainer>
            </RightSection>
         </Page>
      </Router>
   )
}
