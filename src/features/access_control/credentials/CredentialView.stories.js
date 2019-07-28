import React from 'react';
import { storiesOf } from '@storybook/react';
import CredentialView from './CredentialView';

const location = {
   state : {
      entity : {
         username: 'myusername',
         password: 'jdfjlksj3jkl3',
         temp: true,
         createdOn: Date.now(),
         createdBy: '_genesis_',
         // modifiedOn: Date.now(),
         // modifiedBy: 'Genesis'
      }
   }
}
storiesOf('CredentialView', module)
  .add('View Credential', () => (
    <CredentialView location={location}/>
  ));