import React from 'react';
import { storiesOf } from '@storybook/react';
import EBrowser from './EBrowser';
const entities = [
 {name:'permission_create',description:"Create Permission",createdOn:123123123131},
 {name:'Permission_delete',description:"Delete A Permission",createdOn:123123123131},
 {name:'user_create',description:"Create a New User",createdOn:123123123131},
 {name:'product_create',description:"Create a New Product",createdOn:123123123131},
]
storiesOf('EBrowser', module)
  .add('EBrowser', () =><EBrowser entities={entities}/>);