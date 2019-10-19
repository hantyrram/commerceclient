import types from './actions/types';

export default (state, action)=>{

   let newState = { 
      ...state, lastAction: action.type, 
      lastActionPayload: action.payload, 
      lastActionMessage: (action.payload || {}).message,
      lastActionError: (action.payload || {}).error 
   };

   switch(action.type){
      
      case types.ROLES_FETCH_OK: {
         return {...newState, roles: action.payload}
      }
      case types.ROLE_EDIT_OK: {
         //check the role from the roles
         let updatedRole = action.payload;

         if(newState.roles){  
            let i = -1;
            let roleExist = newState.roles.find((r,index)=>{
               i = index; //remember index
               return r._id === updatedRole._id;
            });
            if(roleExist){//role is in the store
               newState.roles.splice(i,1,updatedRole);
            }
         }
         return newState;
      }      
      case types.ROLE_EDIT_NOK: return newState
      case types.ROLE_DELETE_OK: {
         if(!newState.roles) return newState;
         let deletedRole = action.payload;
         let i = -1;
         let role = newState.roles.find((existingRole,index)=>{
            i = index;
            return existingRole._id === deletedRole._id;
         });
         
         if(role){
            newState.roles.splice(i,1);
         }
         return newState;
      }
      case types.APIS_FETCH_OK: return {...newState, apis: action.payload}
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
      case types.EMPLOYEE_FETCH_OK : {
         newState.employees = [];
         newState.employees.push(action.payload);
         return newState;
      }
      case types.EMPLOYEES_FETCH_OK: return {...newState, employees: action.payload}
      case types.EMPLOYEES_ADD_OK: {
         newState.employees? newState.employees.push(action.payload): (newState.employees = []).push(action.payload);
         return { ...newState }
      }
      case types.EMPLOYEE$PHOTO_EDIT_OK: {
         let employee = (newState.employees || []).find(e => e._id === action.payload._id)
         employee.photo = action.payload.photo;
         employee.photoURL = action.payload.photoURL;
         console.log(employee);
         return newState;
      }
      case types.USERACCOUNTS_FETCH_OK: return {...newState, userAccounts: action.payload}
      case types.USERACCOUNT_FETCH_OK: {
         let fetchedUserAccount = action.payload;
         let i = -1;

         if(!newState.userAccounts){
            newState.userAccounts = [];
         }

         let userAccount = newState.userAccounts.find((existingUserAccount,index)=>{
            i = index;
            return existingUserAccount._owner === fetchedUserAccount._owner;
         });
         
         if(userAccount){
            newState.userAccounts.splice(i,1,userAccount);
         }else{
            newState.userAccounts.push(fetchedUserAccount);
         }

         return newState;
      }
      case types.USERACCOUNT$ROLES_ADD_OK: {
         let {username,role} = action.payload;
         let userAccount = (newState.userAccounts || []).find((ua)=>{
            return (ua.credential || {}).username === username;
         });

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
         let {username,role} = action.payload;
         let userAccount = (newState.userAccounts || []).find((ua)=>{
            return (ua.credential || {}).username === username;
         });

         if(userAccount && userAccount.roles && userAccount.roles.length > 0){ 
            let i = userAccount.roles.findIndex(r => r._id === role._id);
            if(i === -1){
               return newState;
            }
            userAccount.roles.splice(i,1);
         }
         return newState;
      }
      case 'GET_RESOURCES_OK': return {...newState, resources: action.payload}
      case 'FETCH_PERMISSIONS_OK': return {...newState, permissions: action.payload}
      default: return newState;
   }
}

//employee add ok ?


