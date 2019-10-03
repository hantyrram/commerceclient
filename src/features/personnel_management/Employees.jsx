import React, { useContext,useEffect, useState } from 'react';
import StateContext from 'contexts/StateContext';
import useFetchEmployees from 'actions/useFetchEmployees';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import ActiveTable from 'components/ActiveTable';
import feature from '../feature';

function Employees({history}){
   let { getStore } = useContext(StateContext);
   let fetchEmployees = useFetchEmployees();

   let {employees} = getStore();
   console.log(getStore());

   useEffect(()=>{
      if(!getStore().employees){ // or stale
         fetchEmployees();
      }
   },[]);

   const onRowClick = (rowData)=>{

      console.log(rowData,'Received From Row Click');
      history.push(`employees/${rowData._id }/edit`, {state: rowData});
   }

   return(
      !employees || employees.length === 0 ? 'No Employees' : 
      <ActiveTable 
         data={
               employees.reduce(function(acc,element){
                  console.log(element);
                  let {_id,identity,joiningDate,contactNo} = element;
                  let {firstname,middlename,lastname,gender,dateOfBirth} = identity;
                  acc.push({_id,firstname,middlename,lastname,gender,dateOfBirth,joiningDate,contactNo});
                  return acc;
               },[])
         } 
         columnHeaders={['Firstname','Middlename','Lastname','Gender','Date Of Birth','Joining Date','Contact No.']}
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




