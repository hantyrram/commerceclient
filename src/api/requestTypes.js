import apis from './apis';
//propertyname=value
const types = Object.getOwnPropertyNames(apis).reduce((acc,el)=>{ 
         acc[el] = el;
         return acc;
      },{});



export default types;

