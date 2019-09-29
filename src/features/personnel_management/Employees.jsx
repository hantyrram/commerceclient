import React, { useContext,useEffect, useState } from 'react';
import StateContext from 'contexts/StateContext';
import useFetchEmployees from 'actions/useFetchEmployees';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import ActiveTable from 'components/ActiveTable';

export default (props)=>{
   let { getStore } = useContext(StateContext);
   let fetchEmployees = useFetchEmployees();
   let [employees,setEmployees] = useState(getStore().employees);

   useEffect(()=>{
      if(!getStore().employees){ // or stale
         fetchEmployees();
      }
   },[]);

   let lastAction = getStore().lastAction;
   let lastActionPayload = getStore().lastActionPayload;

   useEffect(()=>{
      if(lastAction === 'EMPLOYEES_FETCH_OK'){
         setEmployees(lastActionPayload);
      }
   });

   return(
      <Feature group="Admin / Employees" featureShortcuts={[<FeatureShortcutLink to="/employees/add">Add New Employee</FeatureShortcutLink>]}>
         {
            !employees || employees.length === 0 ? 'No Employees' : 
         //    <table>
         //       <thead>
         //          <th>Firstname</th>
         //          <th>Middlename</th>
         //          <th>Lastname</th>
         //          <th>Gender</th>
         //          <th>Date Of Birth</th>
         //          <th>Joining Date</th>
         //          <th>Contact No.</th>
         //       </thead>
         //       <tbody>
         //          {
         //             employees.map(employee=>{
         //                return (
         //                   <tr>
         //                      <td>{employee.identity.firstname}</td>
         //                      <td>{employee.identity.middlename}</td>
         //                      <td>{employee.identity.lastname}</td>
         //                      <td>{employee.identity.gender}</td>
         //                      <td>{employee.identity.dateOfBirth}</td>
         //                      <td>{employee.joiningDate}</td>
         //                      <td>{employee.contactNo}</td>
         //                   </tr>
         //                )
         //             })
         //          }
         //       </tbody>
         //    </table>
         // }
         <ActiveTable 
            data={
                  employees.reduce(function(acc,element){
                     let {_id,identity,joiningDate,contactNo} = element;
                     let {firstname,middlename,lastname,gender,dateOfBirth} = identity;
                     acc.push({_id,firstname,middlename,lastname,gender,dateOfBirth,joiningDate,contactNo});
                     return acc;
                  },[])
            } 
            columnHeaders={['Firstname','Middlename','Lastname','Gender','Date Of Birth','Joining Date','Contact No.']}
            hidden={['_id']}
         />
         }
      </Feature>
   )
   
}




