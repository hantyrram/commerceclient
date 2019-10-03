import React, { useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import StateContext from 'contexts/StateContext';
import useFetchEmployee from 'actions/useFetchEmployee';
import feature from '../../feature';
import Edit from '../../admin/roles/Edit';
// import useAddEmployee from 'actions/useAddEmployee';

function EmployeeEdit({location,match}){
  
   let fetchEmployee = useFetchEmployee();

   let {getStore} = useContext(StateContext);

   let employeeFromStore = (getStore().employees||[]).find(emp=> emp._id === match.params.id);

   let [employee,setEmployee] = useState(employeeFromStore);

   const tryFetchingEmployee = ()=>{
      if(!employee){
         fetchEmployee(match.params.id);
      }
   }

   useEffect(tryFetchingEmployee,[]);

   useEffect(()=>{
      if(employeeFromStore){
         setEmployee(employeeFromStore);
      }
   },[employeeFromStore]);

   const formSubmitHandler = (e)=>{
      e.preventDefault();
      console.log('Submitted',e);
   }

   const changeHandler = (e)=>{
      function setEmployeeIdentity(){
         setEmployee({
            ...employee ,
            ...{ identity: 
                  { ...employee.identity,[e.target.name]:e.target.value }
               }
         });
      }

      switch(e.target.name){
         case 'firstname': setEmployeeIdentity();break;
         case 'middlename': setEmployeeIdentity();break;
         case 'lastname':  setEmployeeIdentity();break;
         case 'gender': setEmployeeIdentity();break;
         case 'dateOfBirth': setEmployeeIdentity();break;
         default: setEmployee({...employee, ...{[e.target.name]:e.target.value}})
      }
   }

   if(!employee){
      return <div>Loading Boy Change Me</div>
   }


   return(
        <form action="#" onSubmit={formSubmitHandler}>
            <h3>Employee Id</h3>
            <div>
               <label htmlFor="employeeId">Enter Employee Id</label>
               <input type="text" name="employeeId" value={employee.employeeId} onChange={changeHandler}/>
            </div>
            <h3>Personal Information</h3>
            <hr/>
            <div>
               <label htmlFor="firstname">Firstname</label>
               <input type="text" name="firstname" value={employee.identity.firstname} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="middlename">Middlename</label>
               <input type="text" name="middlename" value={employee.identity.middlename} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="lastname">Lastname</label>
               <input type="text" name="lastname" value={employee.identity.lastname} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="gender">Gender</label>
               <select name="gender" value={employee.identity.gender} onChange={changeHandler}>
                  <option>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
               </select>
            </div>
            <div>
               <label htmlFor="dateOfBirth">Date Of Birth</label>
               <input type="date" name="dateOfBirth" value={employee.identity.dateOfBirth} onChange={changeHandler}/>
            </div>
            <h3>Address Information</h3>
            <hr/>
            <div>
               <label htmlFor="country">Country</label>
               {/* change to select */}
               <input type="text" name="country" value={employee.country} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="city">City</label>
               <input type="text" name="city" value={employee.city} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="address">Address</label>
               <input type="text" name="address" value={employee.address} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="zipcode">Zip Code</label>
               <input type="text" name="zipcode" value={employee.zipcode} onChange={changeHandler}/>
            </div>
          
            <h3>Employee Information</h3>
            <hr/>
            <div>
               <label htmlFor="joiningDate">Joining Date</label>
               <input type="date" name="joiningDate"  value={employee.joiningDate} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="jobTitle">Job Title</label>
               <input type="text" name="jobTitle" value={employee.jobTitle} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="designation">Designation</label>
               <input type="text" name="designation" value={employee.designation} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="department">Department</label>
               <input type="text" name="department" value={employee.department} onChange={changeHandler}/>
            </div>
            <h3>Contacts</h3>
            <hr/>
            <div>
               <label htmlFor="email">Personal Email</label>
               <input type="email" name="email"  value={employee.email} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="mobileNo">Personal Mobile No.</label>
               <input type="text" name="mobileNo" value={employee.mobileNo} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="companyIssuedEmail">Internal Email</label>
               <input type="email" name="companyIssuedEmail" value={employee.companyIssuedEmail} onChange={changeHandler}/>
            </div>
            <div>
               <label htmlFor="companyIssuedMobileNo">Internal Mobile No.</label>
               <input type="text" name="companyIssuedMobileNo" value={employee.companyIssuedMobileNo} onChange={changeHandler}/>
            </div>
         <button type="submit">Submit</button>
        </form>
   )
   
}


export default feature(EmployeeEdit,{
   title: 'Employee Edit',
   shortcutLinks: [
      <FeatureShortcutLink to="/employees">View All Employees</FeatureShortcutLink>,
      <FeatureShortcutLink to="/employees/add">Add New Employee</FeatureShortcutLink>,
   ]
})


