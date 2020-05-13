import React, { useState,useEffect } from 'react';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import { useEmployee_Add } from 'actions/Employee';
import feature from '../../feature';

function EmployeeAdd(props){

   let date = new Date();

   let initialFormState = {
      identity: {},
      joiningDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,0)}-${date.getDate()}`,
      country: 'Philippines'
   };

   let addEmployee = useEmployee_Add();

   const [employee,setEmployee] = useState(initialFormState);
   
   const formSubmitHandler = (e)=>{
      e.preventDefault();
      addEmployee(employee);
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


export default feature(EmployeeAdd,{
   title: 'Employees / Add New',
   shortcutLinks: [
      <FeatureShortcutLink to="/employees">View Employees</FeatureShortcutLink>
   ]
})



