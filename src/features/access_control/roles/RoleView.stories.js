import React from 'react';
import { storiesOf } from '@storybook/react';
import RoleView from './RoleView';

const location = {
   state : {
      entity : {
         name: 'my_role',
         label: 'My Role',
         description: 'This Role is a new Role',
         createdOn: Date.now(),
         createdBy: '_genesis_',
         // modifiedOn: Date.now(),
         // modifiedBy: 'Genesis'
      }
   }
}
storiesOf('RoleView', module)
  .add('View Role', () => (
    <RoleView location={location}/>
  ));