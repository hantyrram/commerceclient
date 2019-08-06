import React from 'react';
import { storiesOf } from '@storybook/react';
import CredentialCreate from './CredentialCreate';

storiesOf('CredentialCreate', module)
  .add('Create A New Credential Manually', () => (
    <CredentialCreate />
  ));