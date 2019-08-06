export default {
   username : {
      el : "input",
      label: "Username",
      attributes : {
         name : "username",
         id:"username",
         type:"text",
         minLength: 1,
         maxLength: 35,
         autoFocus:true
      }
   },
   password : {
      el : "input",
      label: "Password",
      attributes : {
         name : "password",
         id:"password",
         type:"password",
         minLength: 1,
         maxLength: 35
      }
   },
   temp : {
      el : "input",
      label: "Temporary",
      attributes : {
         name : "createdOn",
         id:"created-on",
         type:"text",
         minLength: 1,
         maxLength: 35,
         readOnly: true
      },
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
         readOnly: true
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
         readOnly: true
      },
   }
}