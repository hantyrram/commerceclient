export default {
   location : {
      el : "input",
      label: "Location",
      attributes : {
         name : "location",
         id:"location",
         type:"text",
         minLength: 1,
         maxLength: 35,
         autoFocus:true
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
         maxLength: 35
      }
   }
}