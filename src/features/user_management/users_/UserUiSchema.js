export default {
 _id : {
  el : "input",//element tag
  label: "Id",//label of the element
  attributes : {//element attributes
   name : "_id",//currently required,see ?? improvement comment on EntityForm
   id:"employee-id",
   type: "text",
   minLength: 1,
   maxLength: 30,
  }
 },
 username : {
  el : "input",
  label: "Username",
  attributes : {
   name : "username",
   id:"username",
   type:"text",
   minLength: 1,
   maxLength: 35,
  },
   // labelAttributes: { //The attributes specific to label element
   //    style: {display:"none"}
   // }
 },
 password : {
   el : "input",
   label: "Password",
   attributes : {
    name : "password",
    id:"password",
    type:"text",
    minLength: 1,
    maxLength: 35,
   },
   // labelAttributes: { //The attributes specific to label element
   //    style: {display:"none"}
   // }
  },
  createdOn : {
   el : "input",
   label: "Created On",
   attributes : {
    name : "createdOn",
    id:"created-on",
    type:"text",
    minLength: 1,
    maxLength: 35,
   },
   transform: v => new Date(v).toUTCString()
  },
  
  createdBy : {
   el : "input",
   label: "Created By",
   attributes : {
    name : "createdBy",
    id:"created-by",
    type:"text",
    minLength: 1,
    maxLength: 35,
    disabled:true,
    
   }
  },
  revoked : {
   el : "input",
   label: "Revoked",
   attributes : {
      name : "revoked",
      id:"revoked",
      type:"text",
      minLength: 4,
      maxLength: 5,
      disabled:true
   },
   transform: v => v ? v : 'No'
},
revokedBy : {
   el : "input",
   label: "Revoked By",
   attributes : {
      name : "revokedBy",
      id:"revoked-by",
      type:"text",
      minLength: 3,
      maxLength: 10,
      disabled:true
   },
   transform: v => v ? v : 'undefined'
},
}


 