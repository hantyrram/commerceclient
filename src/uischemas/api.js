export default {
   path : {
      el : "input",
      label: "URL",
      attributes : {
         name : "path",
         id:"path",
         type:"text",
         minLength: 1,
         maxLength: 35,
         autoFocus:true
      }
   },
   method : {
      el : "input",
      label: "Method",
      attributes : {
         name : "method",
         id:"method",
         type:"text",
         minLength: 1,
         maxLength: 35
      }
   },
   resource : {
      el : "input",
      label: "Resource",
      attributes : {
         name : "resource",
         id:"resource",
         type:"text",
         minLength: 1,
         maxLength: 35,
         readOnly: true
      },
   },
   op : {
      el : "input",
      label: "Operation",
      attributes : {
         name : "op",
         id:"op",
         type:"text",
         minLength: 1,
         maxLength: 35,
         readOnly: true
      }
      
   },
   serviceProvider : {
      el : "input",
      label: "Service Provider",
      attributes : {
         name : "serviceProvider",
         id:"service-provider",
         type:"text",
         minLength: 1,
         maxLength: 35,
         readOnly: true
      },
   }
}