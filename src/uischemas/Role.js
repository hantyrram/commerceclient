export default {
 _id : {
  el : "input",//element tag
  label: "ID",//label of the element
  attributes : {//element attributes
   name : "_id",//currently required,see ?? improvement comment on EntityForm
   id:"role-id",
   type: "text",
   minLength: 1,
   maxLength: 30,
   readOnly: true
  }
 },
 name : {
  el : "input",
  label: "Role Name",
  attributes : {
   name : "name",
   id:"role-name",
   type:"text",
   minLength: 1,
   maxLength: 35
  }
 },
 label : {
   el : "input",
   label: "Label",
   attributes : {
    name : "label",
    id:"role-label",
    type:"text",
    minLength: 1,
    maxLength: 20
   }
  },
 description : {
  el : "input",
  label: "Role Description",
  attributes : {
   name : "description",
   id:"role-description",
   type:"text",
   minLength: 1,
   maxLength: 60
  }
 },
//  permissions : {
//   el: "select",
//   label: "Permissions",
//   attributes: {
//    name: "permissions",
//    id: "role-permissions",
//   },
//   options: [ ]
//  }
}


