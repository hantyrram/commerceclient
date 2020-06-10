import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ActiveTable from 'components/ActiveTable';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import Feature from 'components/Feature';

function List({history}){
   const AddNewEmployeeFA = (props) => <Link to="/hr/employees" {...props}>Add New Employee</Link>
   let { getAppState,dispatch } = useAppState();
   let { employees } = getAppState();
   let fetchEmployees = useApiRequest('EMPLOYEE_LIST',dispatch);
   
   useEffect(()=>{
      fetchEmployees();
   },[]);

   const onRowClick = (rowData)=>{
      history.replace(`/hr/employees/${rowData._id}`, {state: rowData});
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
      <Feature title="Employees" actions={[<AddNewEmployeeFA className="feature-action contained primary"/>]}>
         <ActiveTable 
            key={'e1'}
            data={data} 
            columnHeaders={columnHeaders}
            hidden={['_id']}
            onRowClick={onRowClick}
         />
      </Feature>
   )
   
}

export default List;




