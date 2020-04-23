import React, { useEffect } from 'react';
import ActiveTable from 'components/ActiveTable';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';

function List({history}){
   let { getAppState,dispatch } = useAppState();
   let { employees } = getAppState();
   let fetchEmployees = useApiRequest('EMPLOYEE_LIST',dispatch);
   
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

   let data =  employees.reduce(function(acc,element){
                  let {_id,employeeId,identity,joiningDate,mobileNo} = element;
                  let {firstname,middlename,lastname,gender,dateOfBirth} = identity;
                  acc.push({_id,employeeId,firstname,middlename,lastname,gender,dateOfBirth,joiningDate,mobileNo});
                  return acc;
               },[])
   return(
      <ActiveTable 
         key={'e1'}
         data={data} 
         columnHeaders={columnHeaders}
         hidden={['_id']}
         onRowClick={onRowClick}
      />
   )
   
}

export default List;




