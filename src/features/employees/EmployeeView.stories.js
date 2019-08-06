import React from 'react';
import { storiesOf } from '@storybook/react';
import EmployeeView from './EmployeeView';

const location = {
   state : {
      entity : {
         _id: '45dhhadjdnnad',
         employeeId : 'ht0001',
         salutation : 'Mr',
         fname : 'Ronaldo',
         mname : 'Alcorroque',
         lname : 'Ramano',
         gender : 'm',
         nationality: 'Filipino',
         dateOfBirth: Date.now(),
         email: 'x@yahoo.com',
         alternateEmail: 'alt@yahoo.com',
         joiningDate: Date.now(),
         jobTitle: 'Staging',
         createdOn: Date.now(),
         createdBy: 'Genesis',
         modifiedOn: Date.now(),
         modifiedBy: 'Genesis'
      }
   }
}
storiesOf('EmployeeView', module)
  .add('View Employee', () => (
    <EmployeeView location={location}/>
  ));