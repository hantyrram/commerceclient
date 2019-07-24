
 module.exports = ({config,mode})=>{
   
   config.devServer = {
      proxy : {
         context: ["/apiv1"],
         target: 'http://localhost:1234'
      }
   }
   
   return config;
 }