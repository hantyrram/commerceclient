import React from 'react';
import { storiesOf } from '@storybook/react';
import EBrowser from './EBrowser';
import UISchema from '../../features/uischemas/Role';
console.log(UISchema);
const entities = [
 {_id:12,name:'permission_create',label:"Create Permission",createdOn:123123123131},
 {_id:13,name:'Permission_delete',label:"Delete A Permission",createdOn:123123123131},
 {_id:14,name:'user_create',label:"Create a New User",createdOn:123123123131},
 {_id:15,name:'product_create',label:"Create a New Product",createdOn:123123123131,},
]

function onRead(en,e){
 console.log(en);
}

const searchLookUpFields = [
 'name',
 'label'
];

const actions = [
 { icon: 'edit', onClick: ()=>{} },
 { icon: '',label:'Delete Permission'},
]
storiesOf('EBrowser', module)
  .add('EBrowser', () =><EBrowser UISchema={UISchema} actions={actions} entities={entities} onEdit onDelete onRead={onRead} searchLookUpFields={searchLookUpFields}/>);