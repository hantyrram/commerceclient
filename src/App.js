import React,{useEffect, useContext} from'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
// import Resources from 'features/admin/Resources';

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

const ApiList = React.lazy(()=> import(/*webpackChunkName: "feature.admin.apis.list" */'features/admin/Apis'));
const Roles = React.lazy(()=> import(/*webpackChunkName: "feature.admin.roles" */'features/admin/Roles'));
const RoleCreate = React.lazy(()=>import(/*webpackChunkName: "feature.admin.roles.create" */'features/admin/roles/Create'));
const RoleRead = React.lazy(()=>import(/*webpackChunkName: "feature.admin.roles.read" */'features/admin/roles/Read'));
const RoleEdit= React.lazy(()=>import(/*webpackChunkName: "feature.admin.roles.edit" */'features/admin/roles/Edit'));
const Permissions = React.lazy(()=>import(/*webpackChunkName: "feature.admin.permission.list" */'features/admin/Permissions'));
const Employees = React.lazy(()=> import(/*webpackChunkName: "feature.employees" */'features/employee/index'));
// const EmployeeAdd = React.lazy(()=> import(/*webpackChunkName: "feature.personnel_management.employee.add" */'features/personnel_management/employee/Add'));
const EmployeeView = React.lazy(()=> import(/*webpackChunkName: "feature.employee" */'features/employee/View'));
const UserAccounts = React.lazy(()=> import(/*webpackChunkName: "feature.admin.userAccounts" */'features/admin/UserAccounts'));
// const UserAccountCreate = React.lazy(()=> import(/*webpackChunkName: "feature.admin.userAccount.create" */'features/admin/useraccount/Create'));
const UserAccountRead = React.lazy(()=> import(/*webpackChunkName: "feature.admin.userAccount.read" */'features/admin/useraccount/Read'));
const ProductCategories = React.lazy(()=> import(/*webpackChunkName: "feature.productcategory" */'features/productcategory'));
const ProductCategoryCreate = React.lazy(()=> import(/*webpackChunkName: "feature.productcategory.create" */'features/productcategory/Create'));
const Products = React.lazy(()=> import(/*webpackChunkName: "feature.product" */'features/product/index'));
const ProductAdd = React.lazy(()=> import(/*webpackChunkName: "feature.product.add" */'features/product/Add'));
const ProductView = React.lazy(()=> import(/*webpackChunkName: "feature.product.view" */'features/product/View'));
const ProductAttributes = React.lazy(()=> import(/*webpackChunkName: "feature.productattribute" */'features/productattribute'));

// const ProductView = React.lazy(()=> import(/*webpackChunkName: "feature.catalog.product.view" */'features/catalog/product/View'));
// const Product = React.lazy(()=> import(/*webpackChunkName: "feature.product" */'features/Product'));
// const Shipping = React.lazy(()=> import(/*webpackChunkName: "feature.shipping" */'features/shipping'));
const StoreSettingGeneral = React.lazy(()=> import(/*webpackChunkName: "feature.store.general" */'features/settings_store/General'));
const Shipping = React.lazy(()=> import(/*webpackChunkName: "feature.shipping" */'features/shipping'));
const PageTransitioner = ({history})=>{
   // let {getAppState,dispatch} = useAppState();
   // let appState = getAppState();
  
   // useEffect(()=>{
   //    // if(store.lastAction === actionTypes.ROLE_CREATE_OK){
   //    //    history.push(store.lastActionPayload._id);
   //    // }
   //    switch(appState.lastAction){
   //       case actionTypes.ROLE_CREATE_OK: history.push(appState.lastActionPayload._id);dispatch({type:'PAGE_TRANSITION'});break;
   //       case actionTypes.EMPLOYEE_ADD_OK: history.push(appState.lastActionPayload._id + '/edit');dispatch({type:'PAGE_TRANSITION'});break;
   //       default:
   //    }
   // });
   return(<div>PageTransitioner</div>)
}


export default (props)=>{
   return(
      <Router>
         <div id="admin-page" class="page">
            <div class="page-section-header">Header</div>
            <div class="page-section-sidenav">
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
                     {/* <TreeItem nodeId="32" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/settings/store/shipping">Shipping</Link>} icon={<LocalShippingIcon color="action"  fontSize="small"/>}/> */}
                     <TreeItem nodeId="32" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/storesettings/shipping">Shipping</Link>} icon={<LocalShippingIcon color="action"  fontSize="small"/>}/>
                  </TreeItem>
                  <TreeItem label="Web Administration" nodeId="4">
                     <TreeItem nodeId="41" label={<Link style={{color:"rgb(79, 58, 103)"}}  to="/admin/apis">Apis</Link>} icon={<WebIcon color="action"/>}/>
                     {/* <TreeItem nodeId="42" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/admin/resources">Resources</Link>} icon={<LibraryBooksIcon color="action"  fontSize="small"/>}/> */}
                     <TreeItem nodeId="43" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/admin/roles">Roles</Link>} icon={<SupervisedUserCircleIcon color="action"  fontSize="small"/>}/>
                     <TreeItem nodeId="44" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/admin/permissions">Permissions</Link>} icon={<ViewListIcon color="action"  fontSize="small"/>}/>
                     <TreeItem nodeId="45" label={<Link style={{color:"rgb(79, 58, 103)"}} to="/admin/useraccounts">User Accounts</Link>} icon={<SupervisorAccountIcon color="action"  fontSize="small"/>}/>
                  </TreeItem>
               </TreeView>      
            </div>
            <div class="page-section-main">
               {/* <!-- Main Content --> */}
               <React.Suspense fallback={<div>Loading...</div>}>
                     <Switch>
                        <Route exact path="/employees" component={Employees}/>
                        <Route exact path="/employees/:id/edit" component={EmployeeView}/>
                        <Route exact path="/admin/roles" component={Roles}/> 
                        <Route exact path="/admin/roles/create" component={RoleCreate}/> 
                        <Route exact path="/admin/roles/:id/edit" component={RoleEdit}/> 
                        <Route exact path="/admin/roles/:id" component={RoleRead}/> 
                        
                        {/* <Route exact path="/employees/add" component={EmployeeAdd}/>
                         */}
                        {/* <Route exact path="/admin/resources" component={Resources}/>  */}
                        {/* 
                        <Route exact path="/admin/roles/create" component={RoleCreate}/> 
                        
                        <Route exact path="/admin/roles/:id/edit" component={RoleEdit}/>  */}
                        <Route exact path="/admin/useraccounts" component={UserAccounts}/>
                        <Route exact path="/admin/useraccounts/:employeeId" component={UserAccountRead}/>
                        <Route exact path="/admin/apis" component={ApiList}/>   
                        <Route exact path="/admin/permissions" component={Permissions}/> 
                        <Route exact path="/catalog/products" component={Products}/>
                        <Route exact path="/catalog/products/add" component={ProductAdd}/>
                        <Route path="/catalog/products/:slug" component={ProductView}/>
                        <Route exact path="/catalog/productcategories" component={ProductCategories}/>
                        <Route path="/settings/store/shipping" component={Shipping}/>
                        <Route exact path="/catalog/productcategories/create" component={ProductCategoryCreate}/>
                        {/*   
                        <Route exact path="/admin/useraccounts/create" component={UserAccountCreate}/>
                        <Route exact path="/catalog/products/add" component={ProductAdd}/> */}
                        <Route exact path="/catalog/attributes" component={ProductAttributes}/>
                        
                        <Route path="/settings/store" component={StoreSettingGeneral}/>
                        <Route path="/storesettings/shipping" component={Shipping}/>
                        {/* 
                        <Route path="/settings/store" component={General}/>
                        <Route exact path="/settings/store/shipping" component={Shipping}/> */}
                     </Switch>
                     {/* <Route component={PageTransitioner}/> */}
                  </React.Suspense>
                  <Route component={PageTransitioner}/>
            </div>
         </div>
      </Router>
   )
}
