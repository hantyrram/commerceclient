import React from 'react';
import { storiesOf } from '@storybook/react';
import RoleCreate from './RoleCreate';

storiesOf('RoleCreate', module)
  .add('Create A New Role Manually', () => (
    <RoleCreate />
  ));