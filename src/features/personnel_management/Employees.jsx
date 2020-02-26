import React, { useContext,useEffect, useState } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import ActiveTable from 'components/ActiveTable';
import feature from '../feature';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
function Employees({history}){
   let { getAppState,dispatch } = useAppState();
   let { employees } = getAppState();
   let fetchEmployees = useApiRequest('EMPLOYEE_LIST',dispatch);
   
   console.log('employees=',getAppState());
   useEffect(()=>{
      fetchEmployees();
   },[]);

   const onRowClick = (rowData)=>{
      history.replace(`/employees/${rowData._id}/edit`, {state: rowData});
   }

   const columnHeaders = [
      { employeeId: 'Employee Id' },
      { firstname: 'Firstname' },
      { middlename: 'Middlename' },
      { lastname: 'Lastname' },
      { gender: 'Gender' },
      { dateOfBirth: 'Birthday' },
      { joiningDate: 'Joining Date' },
      { mobileNo: 'Contact No.' },
   ]

   const data =  employees.reduce(function(acc,element){
                  let {_id,employeeId,identity,joiningDate,mobileNo} = element;
                  let {firstname,middlename,lastname,gender,dateOfBirth} = identity;
                  acc.push({_id,employeeId,firstname,middlename,lastname,gender,dateOfBirth,joiningDate,mobileNo});
                  return acc;
               },[])
   return(
      !employees || employees.length === 0 ? 'No Employees' : 
      <ActiveTable 
         key={'e1'}
         data={data} 
         columnHeaders={columnHeaders}
         hidden={['_id']}
         onRowClick={onRowClick}
      />
     
   )
   
}

export default feature(Employees,{
   title: 'Employees',
   shortcutLinks: [
      <FeatureShortcutLink to="/employees/add">Add New Employee</FeatureShortcutLink>
   ]
})




