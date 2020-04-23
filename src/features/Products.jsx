import React, { useEffect } from 'react';
import useAppState from 'appstore/useAppState';
import feature from './feature';
import useApiRequest from 'api/useApiRequest';
import ActiveTable from 'components/ActiveTable';

function List({history}){
   
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
      history.push({pathname: `/catalog/products/${product.slug}`, state:{ product } });
   }

   return(
      <ActiveTable 
         key={'e1'}
         data={ products
               // products.reduce(function(acc,element){
               //    // let {_id, name, type, inStock, netCost,price} = element;
               //    // acc.push({_id,name, type, inStock, netCost,price});
               //    acc.push(element);
               //    return acc;
               // },[])
         } 
         columnHeaders={columnHeaders}
         hidden={['_id']}
         onRowClick={activeTableSelectHandler}
      />   
   )
}


function Main(props){
   return(
      <div className="feature-context">
      <div className="feature-context-title">Products</div>
         <List {...props}/>
      </div>
   )
}

export default feature(Main,{ title : 'Products'});

