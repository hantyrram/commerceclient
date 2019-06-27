import React from 'react';
import { storiesOf } from '@storybook/react';
import {BrowserRouter as Router} from 'react-router-dom';
import EntityBrowser from './EntityBrowser';
import ProductUISchema from './schemas/ProductUISchema';

import products from './sample_entities/Products.json';


const onEdit = (entity)=>{
 console.log("Editing Entity",entity);
}

const onDelete = (entity)=>{
 console.log("Deleting Entity",entity);
}

const onRead = (entity)=>console.log("Reading Entity",entity);


console.log('Products',products);


storiesOf('EntityBrowser', module)
  .add('Users Browser', () =><EntityBrowser UISchema={ProductUISchema} title="Users" entities={products}onRead={onRead} onEdit={onEdit} onDelete={onDelete} />);