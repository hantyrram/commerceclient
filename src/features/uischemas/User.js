export default {
 _id : {
  el : "input",//element tag
  label: "ID",//label of the element
  attributes : {//element attributes
   name : "_id",//currently required,see ?? improvement comment on EntityForm
   id:"user-id",
   type: "text",
   minLength: 1,
   maxLength: 30
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
   maxLength: 35
  }
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
   disabled:true
  },
  transform: v => new Date(v).toUTCString()
 }
}
 