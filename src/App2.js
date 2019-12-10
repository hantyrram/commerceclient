import React,{useReducer, useEffect, useContext} from'react';
import Styled from 'styled-components';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import Resources from 'features/admin/Resources';
import Nav from 'components/Nav';
// import rootReducer from './rootReducer';
import StateContext from 'contexts/StateContext';
import './App.css';
// import RoleList from 'features/admin/roles/List';
import {subscribe} from 'actionEvent';
import actionTypes from 'actions/types';
import useFetchRoles from 'actions/useFetchRoles';
import useFetchPermissions from 'actions/useFetchPermissions';
import useFetchApis from 'actions/useFetchApis';
import useFetchEmployees from 'actions/useFetchEmployees';

const ApiList = React.lazy(()=> import(/*webpackChunkName: "feature.admin.apis.list" */'features/admin/Apis'));
const Roles = React.lazy(()=> import(/*webpackChunkName: "feature.admin.roles" */'features/admin/Roles'));
const RoleCreate = React.lazy(()=>import(/*webpackChunkName: "feature.admin.roles.create" */'features/admin/roles/Create'));
const RoleRead = React.lazy(()=>import(/*webpackChunkName: "feature.admin.roles.read" */'features/admin/roles/Read'));
const RoleEdit= React.lazy(()=>import(/*webpackChunkName: "feature.admin.roles.edit" */'features/admin/roles/Edit'));
const PermissionList = React.lazy(()=>import(/*webpackChunkName: "feature.admin.permission.list" */'features/admin/Permissions'));
const Employees = React.lazy(()=> import(/*webpackChunkName: "feature.personnel_management.employees" */'features/personnel_management/Employees'));
const EmployeeAdd = React.lazy(()=> import(/*webpackChunkName: "feature.personnel_management.employee.add" */'features/personnel_management/employee/Add'));
const EmployeeEdit = React.lazy(()=> import(/*webpackChunkName: "feature.personnel_management.employee.edit" */'features/personnel_management/employee/Edit'));
const UserAccounts = React.lazy(()=> import(/*webpackChunkName: "feature.admin.userAccounts" */'features/admin/UserAccounts'));
const UserAccountCreate = React.lazy(()=> import(/*webpackChunkName: "feature.admin.userAccount.create" */'features/admin/useraccount/Create'));
const UserAccountRead = React.lazy(()=> import(/*webpackChunkName: "feature.admin.userAccount.read" */'features/admin/useraccount/Read'));
const ProductCategories = React.lazy(()=> import(/*webpackChunkName: "feature.catalog.productCategory.main" */'features/catalog/ProductCategories'));
const ProductCategoryCreate = React.lazy(()=> import(/*webpackChunkName: "feature.catalog.productCategory.create" */'features/catalog/productCategory/Create'));
const Products = React.lazy(()=> import(/*webpackChunkName: "feature.catalog.products" */'features/catalog/Products'));
const ProductCreate = React.lazy(()=> import(/*webpackChunkName: "feature.catalog.product.create" */'features/catalog/product/Create'));

const Page = Styled.div`
   width : 100%;
   min-height:100vh;
   display:flex;
   justify-content:space-evenly;
   flow-direction:row;
   
`;

const LeftSection = Styled.div`
   width: 20%;
   min-height: 100%;
   // border: 1px solid red;
   display:inline-block;
`;

const RightSection = Styled.div`
   width:75%;
   min-height: 100%;
   // height: 100%;
   // border: 1px solid green;
   display:inline-block;
   vertical-align: top;
`;

const Header = Styled.div`
   min-height: 5em;
   max-height: 5em;
`

const Content = Styled.div`
   background-color: white;
   // min-height: 90%;
   // height:95%;
   box-shadow:-1px -1px 5px rgba(0,0,0, 0.20),1px 1px 5px rgba(0,0,0,.19);
`
const LogoContainer = Styled.div`
   display:flex;
   justify-content:center;
   
`

const PageTransitioner = ({history})=>{
   let {getStore,dispatch} = useContext(StateContext);
   let store = getStore();
  
   useEffect(()=>{
      // if(store.lastAction === actionTypes.ROLE_CREATE_OK){
      //    history.push(store.lastActionPayload._id);
      // }
      switch(store.lastAction){
         case actionTypes.ROLE_CREATE_OK: history.push(store.lastActionPayload._id);dispatch({type:'PAGE_TRANSITION'});break;
         case actionTypes.EMPLOYEE_ADD_OK: history.push(store.lastActionPayload._id + '/edit');dispatch({type:'PAGE_TRANSITION'});break;
         default:
      }
   });
   return(<div>PageTransitioner</div>)
}



export default ({history})=>{
   let {getStore} = useContext(StateContext);
   let store = getStore();

   // useEffect(()=>{
   //  if(!store.permissions){
   //    fetchPermissions();
   //  }
   //  if(!store.apis){
   //     fetchApis();
   //  }
   //  if(!store.roles){
   //     fetchRoles();
   //  }
   //  if(!store.employees){
   //    fetchEmployees();
   // }
   // },[]);

   return(
      //value emulates a redux store,
      <Router>
         <Page>
            <LeftSection >
               <LogoContainer>  
                  <img src="/images/hantyr_icon.svg" alt="Logo" style={{width:"100px",height:"100px"}} />
               </LogoContainer>  
               <ul>
                  <li>Catalog
                     <ul>
                        <Link to="/catalog/products">Products</Link>
                     </ul>
                     <ul>
                        <Link to="/catalog/productcategories">Product Categories</Link>
                     </ul>
                     <ul>
                        <Link to="/products/features">Product Features</Link>
                     </ul>
                     <ul>
                        <Link to="/products/attributes">Product Attributes</Link>
                     </ul>
                 
                  </li>
               </ul>
               <ul>
                  <li>Access Control
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
               <ul>
                  <li>Personnel Management
                     <ul>
                        <Link to="/employees">Employees</Link>
                     </ul>
                  </li>
               </ul>
               <ul>
                  <li>Web Admin
                     <ul>
                        <Link to="/admin/apis">Apis</Link>                        
                     </ul>
                     <ul>
                        <Link to="/admin/resources">Resources</Link>                        
                     </ul>
                     <ul>
                        <Link to="/admin/roles">Roles</Link>                        
                     </ul>
                     <ul>
                        <Link to="/admin/permissions">Permissions</Link>                        
                     </ul>
                     <ul>
                        <Link to="/admin/useraccounts">User Accounts</Link>                        
                     </ul>
                  </li>
               </ul>
               {/* <Nav menus={[
               {id: 1, label: 'Products'}
               ]}
                  menuItems={[
                     {menuId: 1, link: <Link to="/products">Products</Link>},
                     {menuId: 1, link: <Link to="/products/categories">Product Categories</Link>},
                     {menuId: 1, link: <Link to="/products/features">Product Features</Link>},
                     {menuId: 1, link: <Link to="/products/attributes">Product Attributes</Link>},
                  ]}
               /> */}
            </LeftSection>
            
            <RightSection>
               <Header>Header</Header>
               <Content>
                  <React.Suspense fallback={<div>Loading...</div>}>
                     <Switch>
                        <Route exact path="/employees" component={Employees}/>
                        <Route exact path="/employees/add" component={EmployeeAdd}/>
                        <Route exact path="/employees/:id/edit" component={EmployeeEdit}/>
                        <Route exact path="/admin/resources" component={Resources}/> 
                        <Route exact path="/admin/roles" component={Roles}/> 
                        <Route exact path="/admin/roles/create" component={RoleCreate}/> 
                        <Route exact path="/admin/roles/:id" component={RoleRead}/> 
                        <Route exact path="/admin/roles/:id/edit" component={RoleEdit}/> 
                        <Route exact path="/admin/apis" component={ApiList}/>   
                        <Route exact path="/admin/permissions" component={PermissionList}/>   
                        <Route exact path="/admin/useraccounts" component={UserAccounts}/>
                        <Route exact path="/admin/useraccounts/create" component={UserAccountCreate}/>
                        <Route exact path="/admin/useraccounts/:employeeId" component={UserAccountRead}/>
                        <Route exact path="/catalog/productcategories" component={ProductCategories}/>
                        <Route exact path="/catalog/productcategories/create" component={ProductCategoryCreate}/>
                        <Route exact path="/catalog/products" component={Products}/>
                        <Route exact path="/catalog/products/create" component={ProductCreate}/>
                     </Switch>
                     {/* <Route component={PageTransitioner}/> */}
                  </React.Suspense>
                  <Route component={PageTransitioner}/>
                  <div id="xxx"></div>
               </Content>
            </RightSection>
         </Page>
      </Router>
   )
}

