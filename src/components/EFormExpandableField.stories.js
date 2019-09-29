import React from 'react';
import { storiesOf } from '@storybook/react';
import EForm from 'components/EForm';
import s from 'uischemas/employee';
import EFormExpandableField from './EFormExpandableField';


storiesOf('EFormExpandableField', module)
  .add('EForm Read Only', () => {
   return (<EFormExpandableField />)
  });