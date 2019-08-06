import React from 'react';
import { storiesOf } from '@storybook/react';
import EmployeeAdd from './EmployeeAdd';

storiesOf('EmployeeAdd', module)
  .add('Add Employee with auto generated Employee Id', () => (
    <EmployeeAdd />
  )).add('Add Employee with employee id entry', () => (
   <EmployeeAdd type="manual" />
 ));