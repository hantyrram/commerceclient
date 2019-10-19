import React from 'react';
import { storiesOf } from 'storybook__react';
import EForm from './EForm';
import s from 'uischemas/employee';

const entity = {
   "_id": "5d38343dfdca950ddddbf2e5",
   "employeeId": "_genesis_1",
   "alternateEmail": "aaa@aaa.com",
   "contactNo": "12344567",
   "createdOn": 1563964477637,
   "dateOfBirth": "2019-07-02",
   "email": "sample@sample.com",
   "fname": "RONALDO",
   "gender": "male",
   "jobTitle": "Owner",
   "joiningDate": "2019-07-23",
   "lname": "Ramano",
   "mname": "ALCORROQUE",
   "salutation": "Ms",
   "credential": {
     "username": "genesis",
     "password": "11111111",
     "temp": true,
     "createdOn": 1564045994992
   },
   "lastModBy": "devuser_testuser",
   "lastModComment": "Added admin,genesis Role(s)",
   "lastModified": {
     "$timestamp": {
       "t": 1,
       "i": 1564649251
     }
   },
   "roles": [
     "admin",
     "genesis"
   ]
 }


storiesOf('EForm', module)
//   .addDecorator(StoryRouter())
  // .add('EBread', () => <EBread addPath={addPath} readPath={readPath} UISchema={ProductUISchema} entities={SampleProducts} {...{onAdd,onEdit,onRead,onDelete}}/>)
  .add('EForm Adder', () => <EForm uischema={s}/>)
  .add('EForm Read Only', () => {
   let readOnlySchema = Object.assign({},s);
   Object.getOwnPropertyNames(readOnlySchema).forEach(element => {
      readOnlySchema[element].attributes.readOnly = true; 
   });
   return(<EForm uischema={readOnlySchema} entity={entity}/>)
  });