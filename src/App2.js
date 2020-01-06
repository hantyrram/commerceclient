import React,{useReducer, useEffect, useContext} from'react';
import Styled from 'styled-components';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import Resources from 'features/admin/Resources';
import Nav from 'components/Nav';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRight from '@material-ui/icons/ArrowRight';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import WebIcon from '@material-ui/icons/Web';
import LayersIcon from '@material-ui/icons/Layers';
import ViewListIcon from '@material-ui/icons/ViewList';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
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
import {
   useProduct_FetchAll,
} from 'actions/useProduct';
import { useProductCategory_Fetch } from 'actions/useProductCategory';

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
const Attributes = React.lazy(()=> import(/*webpackChunkName: "feature.catalog.attributes" */'features/catalog/Attributes'));
const ProductAdd = React.lazy(()=> import(/*webpackChunkName: "feature.catalog.product.add" */'features/catalog/product/Add'));
const ProductView = React.lazy(()=> import(/*webpackChunkName: "feature.catalog.product.view" */'features/catalog/product/View'));
const Shipping = React.lazy(()=> import(/*webpackChunkName: "feature.store.shipping" */'features/store/Shipping'));
const General = React.lazy(()=> import(/*webpackChunkName: "feature.store.general" */'features/store/General'));


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
   let fetchAllProducts = useProduct_FetchAll();
   let fetchProductCategories = useProductCategory_Fetch();
   useEffect(()=>{
      //???check user permission for each 
      if(!store.products){
         fetchAllProducts();
      }
      if(!store.ProductCategories){
         fetchProductCategories();
      }
      if(!store.userAccounts){
         
      }

   },[]);

 
   
   return(
      //value emulates a redux store,
      <Router>
         <Page>
            <LeftSection >
               <LogoContainer>  
                  <img src="/images/hantyr_icon.svg" alt="Logo" style={{width:"100px",height:"100px"}} />
               </LogoContainer>  
               
               <TreeView
                  defaultCollapseIcon={<ArrowDropDownIcon />}
                  defaultExpandIcon={<ArrowRight />}
                  defaultExpanded={["1","2","3","4"]}
               >
                  <TreeItem label="Catalog" nodeId="1">
                     <TreeItem nodeId="11" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/catalog/products">Products</Link>} icon={<ShoppingBasketIcon color="action" fontSize="small"/>}/>
                     <TreeItem nodeId="12" label={<Link style={{color:"rgb(79, 58, 103)"}}  to="/catalog/productcategories" >Categories</Link>} icon={<CategoryRoundedIcon color="action"  fontSize="small"/>}/>
                     <TreeItem nodeId="14" label={<Link style={{color:"rgb(79, 58, 103)"}}  to="/catalog/attributes">Attributes</Link>} icon={<LayersIcon color="action"  fontSize="small"/>}/>
                  </TreeItem>
                  <TreeItem label="Personnel Management" nodeId="2">
                     <TreeItem nodeId="21" label={<Link style={{color:"rgb(79, 58, 103)"}}  to="/employees">Employees</Link>} icon={<SupervisedUserCircleIcon color="action"  fontSize="small"/>}/>
                  </TreeItem>
                  <TreeItem label="Store Setting" nodeId="3">
                     <TreeItem nodeId="31" label={<Link style={{color:"rgb(79, 58, 103)"}}  to="/settings/store">General</Link>} icon={<SettingsIcon color="action"  fontSize="small"/>}/>
                     <TreeItem nodeId="32" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/settings/store/shipping">Shipping</Link>} icon={<LocalShippingIcon color="action"  fontSize="small"/>}/>
                  </TreeItem>
                  <TreeItem label="Web Administration" nodeId="4">
                     <TreeItem nodeId="41" label={<Link style={{color:"rgb(79, 58, 103)"}}  to="/admin/apis">Apis</Link>} icon={<WebIcon color="action"/>}/>
                     <TreeItem nodeId="42" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/admin/resources">Resources</Link>} icon={<LibraryBooksIcon color="action"  fontSize="small"/>}/>
                     <TreeItem nodeId="43" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/admin/roles">Roles</Link>} icon={<SupervisedUserCircleIcon color="action"  fontSize="small"/>}/>
                     <TreeItem nodeId="44" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/admin/permissions">Permissions</Link>} icon={<ViewListIcon color="action"  fontSize="small"/>}/>
                     <TreeItem nodeId="45" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/admin/useraccounts">User Accounts</Link>} icon={<SupervisorAccountIcon color="action"  fontSize="small"/>}/>
                  </TreeItem>
               </TreeView>              
            </LeftSection>
            
            <RightSection>
               <Header>Warning!!! Turn Off Allow Origin * on production, set specific allow origin</Header>
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
                        <Route exact path="/catalog/products/add" component={ProductAdd}/>
                        <Route exact path="/catalog/attributes" component={Attributes}/>
                        <Route path="/catalog/products/:slug" component={ProductView}/>
                        <Route path="/settings/store" component={General}/>
                        <Route exact path="/settings/store/shipping" component={Shipping}/>
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

