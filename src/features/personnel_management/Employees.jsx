import React, { useContext,useEffect, useState } from 'react';
import StateContext from 'contexts/StateContext';
import useFetchEmployees from 'actions/useFetchEmployees';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import ActiveTable from 'components/ActiveTable';
import feature from '../feature';

function Employees({history}){
   let { getStore } = useContext(StateContext);
   let fetchEmployees = useFetchEmployees();   
   let {employees} = getStore();

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
   return(
      !employees || employees.length === 0 ? 'No Employees' : 
      <ActiveTable 
         key={'e1'}
         data={
               employees.reduce(function(acc,element){
                  let {_id,employeeId,identity,joiningDate,mobileNo} = element;
                  let {firstname,middlename,lastname,gender,dateOfBirth} = identity;
                  acc.push({_id,employeeId,firstname,middlename,lastname,gender,dateOfBirth,joiningDate,mobileNo});
                  return acc;
               },[])
         } 
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




