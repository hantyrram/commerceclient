import React, { useEffect, useState,useRef } from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import Feature from 'components/Feature.jsx';
import Button from '@material-ui/core/Button';
import MLink from '@material-ui/core/Link';

import { emit } from 'actionEvent';
export default () => {

   const ViewProductsAction = (props) => {
      return <Link to="/catalog/products" {...props}>Products</Link>
   }
   const ViewCategoriesAction = (props) => {
      return <Link to="/catalog/productcategories" {...props}>Product Categories</Link>
   }

   useEffect(()=>{
      emit('message',{type:'TEST_ERROR',text: 'Error Me Softly'})
   },[])

   return(
      <Feature 
         title="Test Feature"
         actions={
            [<ViewProductsAction className="feature-action contained primary" />, <ViewCategoriesAction className="feature-action contained primary" />]
         }
      >
         <div>Test Div inside Feature</div>
      </Feature>
   )
}