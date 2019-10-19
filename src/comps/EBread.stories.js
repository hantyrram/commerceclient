import React from 'react';
import { storiesOf } from 'storybook__react';

import EBread,{Reader} from './EBread';

import ProductUISchema from './schemas/ProductUISchema';
import SampleProducts from './sample_entities/Products';
import StoryRouter from 'storybook-react-router';
const onAdd = (entity)=>console.log('Adding Entity',entity);
const onEdit = (entity)=>console.log('Editing Entity',entity);
const onRead = (entity)=>console.log('Reading Entity',entity);
const onDelete = (entity)=>console.log('Deleting Entity',entity);
const readPath = "/products/:id";
const editorPath = "/products/:id/edit";
const addPath = "/products/add";
console.log(Reader);

storiesOf('EBread', module)
  .addDecorator(StoryRouter())
  // .add('EBread', () => <EBread addPath={addPath} readPath={readPath} UISchema={ProductUISchema} entities={SampleProducts} {...{onAdd,onEdit,onRead,onDelete}}/>)
  .add('Read a product', () => <Reader entity={SampleProducts[0]} editorPath={editorPath} onDelete={onDelete}/>);