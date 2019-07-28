const s = {
 _id : {
  el : "input",//element tag
  label: "ID",//label of the element
  attributes : {//element attributes
   name : "_id",//currently required,see ?? improvement comment on EntityForm
   id:"role-id",
   type: "text",
   minLength: 1,
   maxLength: 30,
   hidden:true,
   readOnly:true,
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
  label: "Role Description",
  attributes : {
   name : "label",
   id:"role-label",
   type:"text",
   minLength: 1,
   maxLength: 35
  }
 },
 permissions : {
  el: "select",
  label: "Permissions",
  attributes: {
   name: "permissions",
   id: "role-permissions",
  },
  options: [ ]
 }
}

const SIZE = 1;

s.name.attributes.style = {width: String(s.name.attributes.maxLength * SIZE) + 'em'};
s.label.attributes.style = {width: String(s.name.attributes.maxLength * SIZE) + 'em'};
s.permissions.attributes.style = {width: String(s.name.attributes.maxLength * SIZE) + 'em'};

export default s;