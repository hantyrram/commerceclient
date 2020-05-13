import React, { useEffect } from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import ActiveTable from 'components/ActiveTable';

export default ({history}) => {
   
   let { getAppState, dispatch } = useAppState();
   let { products } = getAppState();
   let getProducts = useApiRequest('PRODUCT_LIST',dispatch);

   useEffect(()=>{
      getProducts();
   },[]);


   const columnHeaders = [
      { name: 'Product Name' },
      { type: 'Product Type' },
      { inStock: 'In Stock' },
      { netCost: 'Net Cost' },
   ]

   const activeTableSelectHandler = (product)=>{
      history.push({pathname: `/catalog/products/${product.slug}`, state: { product }});
   }

   return(
      <ActiveTable 
         key={'e1'}
         data={ products.map( p=> {
               return {...p, inStock: Boolean(p.inventory && p.inventory.quantity > 0)}
            })
         } 
         columnHeaders={columnHeaders}
         hidden={['_id']}
         onRowClick={activeTableSelectHandler}
      />   
   )
}