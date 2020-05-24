import React from 'react';

// const ApiList = React.lazy(()=> import(/*webpackChunkName: "feature.admin.apis.list" */'features/admin/Apis'));
// const Roles = React.lazy(()=> import(/*webpackChunkName: "feature.admin.roles" */'features/admin/Roles'));
// const RoleCreate = React.lazy(()=>import(/*webpackChunkName: "feature.admin.roles.create" */'features/admin/roles/Create'));
// const RoleRead = React.lazy(()=>import(/*webpackChunkName: "feature.admin.roles.read" */'features/admin/roles/Read'));
// const RoleEdit= React.lazy(()=>import(/*webpackChunkName: "feature.admin.roles.edit" */'features/admin/roles/Edit'));
// const Permissions = React.lazy(()=>import(/*webpackChunkName: "feature.admin.permission.list" */'features/admin/Permissions'));
const Employees = React.lazy(()=> import(/*webpackChunkName: "feature.employees" */'features/employee/index'));

const AddEmployee = React.lazy(()=> import(/*webpackChunkName: "feature.personnel_management.employee.add" */'features/employee/Add'));
const ViewEmployee = React.lazy(()=> import(/*webpackChunkName: "feature.employee" */'features/employee/View'));
const UserAccounts = React.lazy(()=> import(/*webpackChunkName: "feature.admin.userAccounts" */'features/admin/UserAccounts'));
// const UserAccountCreate = React.lazy(()=> import(/*webpackChunkName: "feature.admin.userAccount.create" */'features/admin/useraccount/Create'));
// const UserAccountRead = React.lazy(()=> import(/*webpackChunkName: "feature.admin.userAccount.read" */'features/admin/useraccount/Read'));
const ProductCategories = React.lazy(()=> import(/*webpackChunkName: "feature.productcategory" */'features/productcategory'));
const CreateProductCategory = React.lazy(()=> import(/*webpackChunkName: "feature.productcategory.create" */'features/productcategory/Create'));
const Products = React.lazy(()=> import(/*webpackChunkName: "feature.product" */'features/product/index'));
const AddProduct = React.lazy(()=> import(/*webpackChunkName: "feature.product.add" */'features/product/Add'));
const ViewProduct = React.lazy(()=> import(/*webpackChunkName: "feature.product.view" */'features/product/View'));
const ProductAttributes = React.lazy(()=> import(/*webpackChunkName: "feature.productattribute" */'features/productattribute'));

// const ProductView = React.lazy(()=> import(/*webpackChunkName: "feature.catalog.product.view" */'features/catalog/product/View'));
// const Product = React.lazy(()=> import(/*webpackChunkName: "feature.product" */'features/Product'));
// const Shipping = React.lazy(()=> import(/*webpackChunkName: "feature.shipping" */'features/shipping'));
const StoreSettingGeneral = React.lazy(()=> import(/*webpackChunkName: "feature.store.general" */'features/settings_store/General'));
const Shipping = React.lazy(()=> import(/*webpackChunkName: "feature.shipping" */'features/shipping/Index'));
const TestFeature = React.lazy(()=> import(/*webpackChunkName: "feature.TestFeature" */'features/TestFeature.jsx'));
const Dashboard = React.lazy(()=> import(/*webpackChunkName: "feature.Dashboard" */'features/Dashboard.jsx'));
const UnderConstruction = React.lazy(()=> import(/*webpackChunkName: "feature.UnderConstruction" */'features/UnderConstruction.jsx'));
const CATALOG = "Catalog";
const ORDERS = "Orders";
const CUSTOMERS = "Customers";
const WEB_ADMINISTRATION = "Web Administration";
const STORE_SETTING = "Store Setting";

const HR = "HR";
const PRIMARY = 1;
export default [
   // { path: "/", name:"Dashboard", Component: Dashboard },
   { path: "/catalog/products", name: "Products", Component: Products, featureType: PRIMARY, featureGroup: CATALOG },
   { path: "/catalog/products/add", name: "Add Product", Component: AddProduct },
   { path: "/catalog/products/:slug", name: "Product", Component: ViewProduct },
   { path: "/catalog/productcategories", name: "Product Categories", Component: ProductCategories, featureType: PRIMARY, featureGroup: CATALOG },
   { path: "/catalog/productcategories/create", name: "Product Categories", Component: CreateProductCategory },
   { path: "/catalog/productattributes", name: "Product Attributes", Component: ProductAttributes,featureType: PRIMARY, featureGroup: CATALOG },
   { path: "/orders", name: "Orders", Component: UnderConstruction, featureType: PRIMARY, featureGroup: ORDERS },   
   { path: "/orders/invoices", name: "Invoices", Component: UnderConstruction, featureType: PRIMARY, featureGroup: ORDERS },
   { path: "/orders/deliveryslips", name: "Delivery Slips", Component: UnderConstruction, featureType: PRIMARY, featureGroup: ORDERS },
   { path: "/orders/shoppingcarts", name: "Shopping Carts", Component: UnderConstruction, featureType: PRIMARY, featureGroup: ORDERS },
   { path: "/customers", name: "Customers", Component: UnderConstruction, featureType: PRIMARY, featureGroup: CUSTOMERS },

   { path: "/hr/employees", name: "Employees", Component: Employees, featureType: PRIMARY, featureGroup: HR },
   { path: "/hr/employees/add", name: "Add New Employee", Component: AddEmployee },
   { path: "/hr/employees/:employeeId", name: "Employee", Component: ViewEmployee },
   { path: "/settings/store/general", name: "Store Setting", Component: StoreSettingGeneral,featureType: PRIMARY, featureGroup: STORE_SETTING },
   { path: "/settings/store/shipping", name: "Shipping", Component: Shipping, featureType: PRIMARY, featureGroup: STORE_SETTING },
   { path: "/webadmin/useraccounts", name: "User Accounts", Component: UserAccounts, featureType: PRIMARY, featureGroup: STORE_SETTING },
   { path: "/test", name: "Test Feature", Component: TestFeature, featureType: PRIMARY, featureGroup: STORE_SETTING },
]

