import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import ActiveTable from 'components/ActiveTable';
import Feature from 'components/Feature';
import {AddNewProduct} from './featureaction';

export default ({history}) => {
   
   let { getAppState, dispatch } = useAppState();
   let { products } = getAppState();
   let getProducts = useApiRequest('PRODUCT_LIST',dispatch);

   useEffect(()=>{
      getProducts();
   },[]);


   const columnHeaders = [
      { name: 'Product Name' },
      { category: 'Category'},
      { type: 'Product Type' },
      { inStock: 'In Stock' },
      { netCost: 'Net Cost' },
   ]

   const activeTableSelectHandler = (product)=>{
      history.push({pathname: `/catalog/products/${product.slug}`, state: { product }});
   }

   
   return(
      <Feature 
         title="Products"
         actions={[<Link className="feature-action contained" to="/catalog/products/add">Add New Product</Link>]}
      >
         <ActiveTable 
            key={'e1'}
            data={ products.map( p=> {
                  let category = p.category && p.category.name; 
                  category = category === undefined ? '<No Category>' : category ;
                  return {...p, category, inStock: Boolean(p.inventory && p.inventory.quantity > 0)}
               })
            } 
            columnHeaders={columnHeaders}
            hidden={['_id']}
            onRowClick={activeTableSelectHandler}
         />   
      </Feature>
      
   )
}