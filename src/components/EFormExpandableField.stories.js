import React from 'react';
import { storiesOf } from 'storybook__react';
import EForm from './EForm';
import s from 'uischemas/employee';
import EFormExpandableField from './EFormExpandableField';


storiesOf('EFormExpandableField', module)
  .add('EForm Read Only', () => {
   return (<EFormExpandableField />)
  });