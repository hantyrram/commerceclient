import React from 'react';
import feature from 'features/feature';
import List from './List';

function Main(props){
   return(
      <div className="feature-context">
      <div className="feature-context-title">
         Product List
      </div>
         <List {...props}/>
      </div>
           
   )
}

export default feature(Main, 
      { 
         title : 'Products', 
         links : [
            {
               path : '/catalog/products/add', label: 'Add New Product',
               path : '/catalog/products', label: 'View Products'
            }
         ]
      }
   );