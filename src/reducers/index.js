import types from '../actions/types';

//NOTE: MAKE SURE TO RETURN THE STATE BY DEFAULT

const productsReducer = (productsState = [], action)=>{

   let newState = [...productsState];

   switch(action.type){

      case types.PRODUCT_CREATE_OK: {
         return [...newState, action.payload];
      }
     
      case types.PRODUCT_FETCHALL_OK: {
         return [ ...action.payload ]
      }

      case types.PRODUCT_UPDATE_OK: {
         let product = newState.find(p => p._id === action.payload._id)
         
         product = Object.assign(product,{...action.payload})
         
         return newState;
      }
      default: return newState;
   }
}

const productCategoriesReducer = (productCategoriesState = [], action) => {
   
   let newState = [...productCategoriesState];
   switch(action.type){

      case types.PRODUCTCATEGORY_FETCH_OK: {
         return [ ...action.payload ];
      }

      case types.PRODUCTCATEGORY_CREATE_OK: {
         return [...newState, action.payload];
      }

      default: return newState;
   }
}

//products attribute
const attributesReducer = (attributesState = [], action)=>{

   let newState = [...attributesState];

   switch(action.type){

      case types.ATTRIBUTE_CREATE_OK: {
         return [...newState, action.payload];
      }
     
      case types.ATTRIBUTE_FETCHALL_OK: {
         return [ ...action.payload ]
      }

      case types.ATTRIBUTE_UPDATE_OK: {
         let attribute = newState.find(p => p._id === action.payload._id)
         
         attribute = Object.assign(attribute,{...action.payload})
         
         return newState;
      }

      case types.ATTRIBUTE_ADDTERM_OK: {
         let attribute = newState.find(p => p._id === action.payload._id)

         attribute.terms = !attribute.terms ? 
            attribute.terms = [...action.payload.terms]: 
               Array.from(
                  //create set to avoid duplicate
                  new Set([ ...attribute.terms, ...action.payload.terms])
               );
         return newState;
      }
      case types.ATTRIBUTE_DELETETERM_OK: {
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
      case types.USERACCOUNTS_FETCH_OK: return [ ...action.payload ]
      case types.USERACCOUNT_FETCH_OK: { 
     
         let i = newState.findIndex( u => u._owner === action.payload._owner);

         i === -1 ? newState.push(action.payload): newState.splice(i,1,action.payload);

         return newState;
      }
      case types.USERACCOUNT$ROLES_ADD_OK: {
         let { username, role } = action.payload;
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
      case types.USERACCOUNT$ROLES_DELETE_OK: {
         let { username, role } = action.payload;
         let userAccount = newState.find( ua => (ua.credential || {}).username === username );
         let i = ((userAccount || {}).roles || []).findIndex(r => r._id === role._id);
         ((userAccount || {}).roles || []).splice(i,1);
         return newState;
      }
      default: return newState;
   }
}

const rolesReducer = (roles = [],action) => {
   let newState = [...roles];
   switch(action.type){
      case types.ROLES_FETCH_OK: {
         return [...action.payload]
      }
      case types.ROLE_EDIT_OK: {
         //check the role from the roles
         let updatedRole = action.payload;
         let index = newState.findIndex(r=>r._id === updatedRole._id)
         if(index !== -1){
            newState.splice(index,1,updatedRole);
         }
         return newState;
      }      
      case types.ROLE_EDIT_NOK: return newState
      case types.ROLE_DELETE_OK: {
         let deletedRole = action.payload;
         let index = newState.findIndex(r=>r._id === deletedRole._id)
         if(index !== -1){
            newState.splice(index,1);
         }
         return newState;
      }
      case types.ROLE_FETCH_OK: {
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
      default: return newState;
   }
}

const apisReducer = (apis = [], action) => {
   let newState = [...apis];
   switch(action.type){
      case types.APIS_FETCH_OK : return [...action.payload];
      default: return newState;
   }
}

const employeesReducer = (employees = [], action) => {
   let newState = [...employees];
   switch(action.type){
      case types.EMPLOYEE_FETCH_OK : {
         newState.push(action.payload);
         return newState;
      }
      case types.EMPLOYEES_FETCH_OK: return [...action.payload]
      case types.EMPLOYEES_ADD_OK:   return [...newState, action.payload]
      case types.EMPLOYEE$PHOTO_EDIT_OK: {
         let employee = newState.find(e => e._id === action.payload._id)
         employee.photo = action.payload.photo;
         employee.photoURL = action.payload.photoURL;
         return newState;
      }
      default: return newState;
   }
}

const countriesReducer = ( countries = [], action) => {
   let newState = [...countries];
   switch(action.type){
      case types.HELPERS_GETCOUNTRIES_OK : {
         return [...action.payload];
      }
      default: return newState;
   }
}

/**
 * Root Reducer
 */
export default (state, action)=>{

   let newState = { 
      ...state, 
      lastAction: action.type, 
      lastActionPayload: action.payload, 
      lastActionMessage: (action.payload || {}).message,
      lastActionError: (action.payload || {}).error, 
      apis: apisReducer(state.apis,action),
      roles: rolesReducer(state.roles,action),
      employees: employeesReducer(state.employees,action),
      userAccounts: userAccountsReducer(state.userAccounts,action),
      products: productsReducer(state.products,action),
      productCategories: productCategoriesReducer(state.productCategories,action),
      attributes: attributesReducer(state.attributes,action),
      countries: countriesReducer(state.countries,action)
   };

   switch(action.type){
      case 'GET_RESOURCES_OK': return {...newState, resources: action.payload}
      case 'FETCH_PERMISSIONS_OK': return {...newState, permissions: action.payload}
      default: return newState;
   }
}
