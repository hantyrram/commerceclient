import types from 'actions/types';//remove this once apiRequestActionTypes is fixed.
import apiRequestActionTypes from '../api/apiRequestActionTypes';

//NOTE: MAKE SURE TO RETURN THE STATE BY DEFAULT

const productsReducer = (productsState = [], action)=>{

   let newState = [...productsState];

   switch(action.type){

      case apiRequestActionTypes.PRODUCT_ADD_OK: {
         return [...newState, action.payload];
      }

      case apiRequestActionTypes.PRODUCT_READ_OK: {
         let product = newState.find(p=> p._id === action.payload._id);
         if(product){
            Object.assign(product,action.payload);
         }else{
            newState.push(action.payload);
         }
         return newState;
      }
     
      case apiRequestActionTypes.PRODUCT_LIST_OK: {
         return [ ...action.payload ]
      }

      case apiRequestActionTypes.PRODUCT_UPDATE_OK: {
         let product = newState.find(p => p._id === action.payload._id);
         
         Object.assign(product,{...action.payload})
         
         return newState;
      }

      case apiRequestActionTypes.PRODUCT$CATEGORY_EDIT_OK : {
         let product = newState.find(p => p._id === action.payload._id);
         
         Object.assign(product,{...action.payload})
         
         return newState;
      }

      case apiRequestActionTypes.PRODUCT$IMAGES_ADD_OK: {
         //payload = Product.Image
         let product = newState.find(p => p._id === action.payload.metadata.owner);
         console.log(product);
         console.log(action.payload);
         let images = [...product.images, action.payload];
         Object.assign(product, { images } );
         console.log(newState);
         return newState;
      }
      case apiRequestActionTypes.PRODUCT$IMAGES_DELETE_OK: {
         //payload = {product_id, _id} where _id = image id
         let product = newState.find(p => p._id === action.payload.product_id);
         if( product && product.images && product.images.length > 0){
            let imageIndex = product.images.findIndex( img => img._id === action.payload._id);
            if(imageIndex !== -1){
               product.images.splice(imageIndex,1);
               console.log('Deleting Image');
            }
         }
         console.log(newState);
         return newState;
      }
      default: return newState;
   }
}

const productCategoriesReducer = (productCategoriesState = [], action) => {
   
   let newState = [...productCategoriesState];
   switch(action.type){

      case apiRequestActionTypes.PRODUCTCATEGORY_LIST_OK: {
         return [ ...action.payload ];
      }

      case apiRequestActionTypes.PRODUCTCATEGORY_CREATE_OK: {
         return [...newState, action.payload];
      }

      default: return newState;
   }
}

//products attribute
const attributesReducer = (attributesState = [], action)=>{

   let newState = [...attributesState];

   switch(action.type){

      case apiRequestActionTypes.PRODUCTATTRIBUTE_CREATE_OK: {
         return [...newState, action.payload];
      }
     
      case apiRequestActionTypes.PRODUCTATTRIBUTE_LIST_OK: {
         return [ ...action.payload ]
      }

      case apiRequestActionTypes.PRODUCTATTRIBUTE_UPDATE_OK: {
         let attribute = newState.find(p => p._id === action.payload._id)
         
         attribute = Object.assign(attribute,{...action.payload})
         
         return newState;
      }

      case apiRequestActionTypes.PRODUCTATTRIBUTE$TERMS_ADD_OK: {
         let attribute = newState.find(p => p._id === action.payload._id)

         attribute.terms = !attribute.terms ? 
            attribute.terms = [...action.payload.terms]: 
               Array.from(
                  //create set to avoid duplicate
                  new Set([ ...attribute.terms, ...action.payload.terms])
               );
         return newState;
      }
      case apiRequestActionTypes.PRODUCTATTRIBUTE$TERMS_REMOVE_OK: {
         let attribute = newState.find(p => p._id === action.payload._id)
         if(attribute && attribute.terms){
            let i = attribute.terms.findIndex(t => t === action.payload.terms[0]);
            if(i !== -1){
               attribute.terms.splice(i,1);
            }
         }
         return newState;
      }
      default: return newState;
   }
}

const userAccountsReducer = (userAccounts = [], action) => {
   
   let newState = [ ...userAccounts ];

   switch(action.type){
      case apiRequestActionTypes.USERACCOUNT_LIST_OK: return [ ...action.payload ]
      case apiRequestActionTypes.USERACCOUNT_READ_OK: { 
     
         let i = newState.findIndex( u => u._owner === action.payload._owner);

         i === -1 ? newState.push(action.payload): newState.splice(i,1,action.payload);

         return newState;
      }
      case apiRequestActionTypes.USERACCOUNT$ROLES_ADD_OK: {
         let { username, role } = action.payload;
         console.log(username,role);
         let userAccount = newState.find( ua => (ua.credential || {}).username === username );
         if(userAccount){ 
            if(!userAccount.roles){
               userAccount.roles = [];
            }
            
            let i = userAccount.roles.findIndex(r => r._id === role._id);
            if(i !== -1){
               return newState;
            }
            userAccount.roles.push(role);
         }
         
         return newState;
      }
      case apiRequestActionTypes.USERACCOUNT$ROLES_DELETE_OK: {
         let { username, roleId } = action.payload;
         let userAccount = newState.find( ua => (ua.credential || {}).username === username );
         let i = ((userAccount || {}).roles || []).findIndex(r => r._id === roleId);
         ((userAccount || {}).roles || []).splice(i,1);
         return newState;
      }
      default: return newState;
   }
}

const rolesReducer = (roles = [],action) => {
   let newState = [...roles];
   switch(action.type){
      case apiRequestActionTypes.ROLE_LIST_OK: {
         return [...action.payload]
      }
      case apiRequestActionTypes.ROLE_EDIT_OK: {
         //check the role from the roles
         let updatedRole = action.payload;
         let index = newState.findIndex(r=>r._id === updatedRole._id)
         if(index !== -1){
            newState.splice(index,1,updatedRole);
         }
         return newState;
      }      
      case apiRequestActionTypes.ROLE_EDIT_NOK: return newState
      case apiRequestActionTypes.ROLE_DELETE_OK: {
         let deletedRole = action.payload;
         let index = newState.findIndex(r=>r._id === deletedRole._id)
         if(index !== -1){
            newState.splice(index,1);
         }
         return newState;
      }
      case apiRequestActionTypes.ROLE_READ_OK: {
         let fetchedRole = action.payload;
         let i = -1;

         if(!newState.roles){
            newState.roles = [];
         }

         let role = newState.roles.find((existingRole,index)=>{
            i = index;
            return existingRole._id === fetchedRole._id;
         });
         
         if(role){
            newState.roles.splice(i,1,role);
         }else{
            newState.roles.push(fetchedRole);
         }

         return newState;
      }
      case apiRequestActionTypes.ROLE$PERMISSIONS_LIST: {
         
      }
      default: return newState;
   }
}

const apisReducer = (apis = [], action) => {
   let newState = [...apis];
   switch(action.type){
      case apiRequestActionTypes.API_LIST_OK: return [...action.payload];
      default: return newState;
   }
}

const employeesReducer = (employeesState = [], action) => {
   let newState = [...employeesState];

   switch(action.type){
      case apiRequestActionTypes.EMPLOYEE_READ_OK : {
         newState.push(action.payload);
         return newState;
      }
      case apiRequestActionTypes.EMPLOYEE_LIST_OK: {
         console.log('@reducer: employeeReducer',action.payload);
         return [...action.payload]
      }
      case apiRequestActionTypes.EMPLOYEE_ADD_OK:   return [...newState, action.payload]
      case apiRequestActionTypes.EMPLOYEE$PHOTO_EDIT_OK: {
         console.log(action.payload);
         let employee = newState.find(e => e._id === action.payload._id)
         employee.photo = action.payload;
         return newState;
      }
      default: return newState;
   }
}


const countriesReducer = ( countries = [], action) => {
   let newState = [...countries];
   
   switch(action.type){
      case apiRequestActionTypes.UTIL$EXTDATA$COUNTRY_LIST_OK : 
         return [...action.payload];
      default: return newState;
   }
}

//country states
const statesReducer = ( states = {}, action) => {
   let newState = Object.assign({},states);
   switch(action.type){
      case apiRequestActionTypes.UTIL$EXTDATA$COUNTRYSTATE_LIST_OK : {
         return { ...action.payload } // e.g. action.payload = {'United States': []}
         // return {...action.payload }
      }
      default: return newState;
   }
}
//country states
const citiesReducer = ( cities = {}, action) => {
   let newState = Object.assign({},cities);
   switch(action.type){
      case apiRequestActionTypes.UTIL$EXTDATA$COUNTRYCITY_LIST_OK : {
         return { ...action.payload } // e.g. action.payload = {'United States': []}
         // return {...action.payload }
      }
      default: return newState;
   }
}

const permissionsReducer = (permissionsState = [],action)=>{
   let newState = [...permissionsState];
   if(action.type === 'PERMISSION_LIST_OK'){
      return [...action.payload];
   }
   return newState;
}

const resourcesReducer = (resourcesReducer = [],action)=>{
   let newState = [...resourcesReducer];
   if(action.type === 'RESOURCES_LIST_OK'){
      return [...action.payload];
   }
   return newState;
}


const storeSettingsReducer =  (storeSettings = [],action) => {
   let newState = [...storeSettings];
   switch(action.type){
      case apiRequestActionTypes.STORESETTING_LIST_OK: {
         return [ ...action.payload ]
      }
         
      case apiRequestActionTypes.STORESETTING$BASIC_EDIT_OK: {
         let basicSetting = newState.find( s=> s.name === 'StoreSetting.Basic');
         if(!basicSetting){
            newState.push( action.payload );
         }else{
            Object.assign(basicSetting, action.payload);
         }

         return newState;
      }
      case apiRequestActionTypes.STORESETTING$SHIPPING$SHIPPINGORIGIN_EDIT_OK: {
         let shippingOrigin = newState.find( s=> s.name === 'StoreSetting.Shipping.ShippingOrigin');
         if(!shippingOrigin){
            newState.push( action.payload );
         }else{
            Object.assign(shippingOrigin, action.payload);
         }

         return newState;
      }
     
         
      default: return newState;
   }

}

const shippingZonesReducer = (state = [],action)=>{
   let newState = [...state];
   switch(action.type){
      case apiRequestActionTypes.STORESETTING$SHIPPING$SHIPPINGZONE_ADD_OK : {
         newState.push( action.payload );
      }break;
      case apiRequestActionTypes.STORESETTING$SHIPPING$SHIPPINGZONE_EDIT_OK : {
         let shippingZone = newState.find( sz => sz._id === action.payload._id);
         if(shippingZone){
            Object.assign(shippingZone, action.payload);
         }
         return newState;
      }
      case apiRequestActionTypes.STORESETTING$SHIPPING$SHIPPINGZONE_DELETE_OK : {
         let i = newState.findIndex( sz => sz._id === action.payload._id);
         if(i !== -1){
            newState.splice(i,1);
         }
         return newState;
      }
      case apiRequestActionTypes.STORESETTING$SHIPPING$SHIPPINGZONE$SHIPPINGMETHOD_ADD_OK : {
         let shippingZone = newState.find( sz => sz._id === action.payload._id);
         Object.assign(shippingZone, action.payload);
         console.log(shippingZone);
         console.log(newState);
         return newState;
      }
      case apiRequestActionTypes.STORESETTING$SHIPPING$SHIPPINGZONE$SHIPPINGMETHOD_DELETE_OK : {
         let shippingZone = newState.find( sz => sz._id === action.payload._id);
         if(shippingZone){
            Object.assign(shippingZone, action.payload);
         }
         return newState;
      }break;
      case apiRequestActionTypes.STORESETTING$SHIPPING$SHIPPINGZONE_LIST_OK : {
         return  action.payload;
      }break;
   }
   return newState;
}

const psgcReducer = (state = {}, action)=>{
   if(action.type === 'UTIL$EXTDATA$PSGC_READ_OK'){
      
   }
}

const identityReducer = ( identity = null, action)=>{
   switch(action.type){
      case "AUTH$LOGIN_EXEC_OK":{
         return action.payload;
      }
      case "AUTH$LOGIN_EXEC_NOK":{
         return null;
      }
      case "AUTH$LOGOUT_EXEC_OK":{
         return null;
      }
      case "AUTH$AUTHENTICATE_EXEC_OK":{
         return action.payload;
      }
      case "AUTH$AUTHENTICATE_EXEC_NOK":{
         return null;
      }
   }
   return identity;
}

const settingsReducer = (settings = {}, action ) => {
   let settingState = {...settings};

   return settingState;
}

const utilReducer = ( util = { countries:[], countryStates: {}, cities: {} }, action ) => {
   let newState = { ...util };

   switch(action.type){
      case apiRequestActionTypes.UTIL$EXTDATA$COUNTRY_LIST_OK : 
         return { ...newState, countries: action.payload };

      case apiRequestActionTypes.UTIL$EXTDATA$COUNTRYSTATE_LIST_OK : {
         //action.payload schema = {'United States': []}
         return { ...newState, countryStates: { ...newState.countryStates, ...action.payload }} 
      }   
      case apiRequestActionTypes.UTIL$EXTDATA$COUNTRYCITY_LIST_OK : {
         return { ...newState, cities:  { ...newState.cities, ...action.payload }} // e.g. action.payload = {'United States': []}
         // return {...action.payload }
      }
      default: return newState;
   }
}
/**
 * Root Reducer
 */
export default (state, action)=>{

   let newState = { ...state }

   //INIT is triggered on page reload, init from localStorage, state = localStorage state
   if(action.type === 'INIT'){ 
      newState = { ...newState, ...action.payload } // 
      // return newState;
   }

   // if(action.type === 'AUTH$LOGIN_EXEC_OK'){
   //    console.log('LoginOk',action.payload);
   //    newState = { ...newState , identity: action.payload }
   // }
   console.log(`@reducer:reducer, Current State: `,state);
   return { 
      ...newState,
      lastAction: action.type, 
      lastActionPayload: action.payload, 
      lastActionMessage: (action.payload || {}).message,
      lastActionError: (action.payload || {}).error, 
      identity: identityReducer(state.identity,action),
      apis: apisReducer(state.apis,action),
      roles: rolesReducer(state.roles,action),
      employees: employeesReducer(state.employees,action),
      userAccounts: userAccountsReducer(state.userAccounts,action),
      products: productsReducer(state.products,action),
      productCategories: productCategoriesReducer(state.productCategories,action),
      attributes: attributesReducer(state.attributes,action),
      permissions: permissionsReducer(state.permissions,action),
      resources: resourcesReducer(state.resources,action),
      //helpersData
      countries: countriesReducer(state.countries,action),
      states: statesReducer(state.states,action),
      cities: citiesReducer(state.cities,action),
      storeSettings: storeSettingsReducer(state.storeSettings,action),
      shippingZones: shippingZonesReducer(state.shippingZones,action),
      settings: settingsReducer(state.settings, action),
      util: utilReducer(state.util,action),
      psgc: psgcReducer(state.psgc,action)
   };

   

}
