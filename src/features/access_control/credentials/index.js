import React from 'react';
import {Link} from 'react-router-dom';


export default ()=>{
   return(
      <div>
         Employees 
         <Link to="/credentials/create">Create Credential</Link>
      </div>
   )
}