import React, { useContext, useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import useAppStore from 'hooks/useAppStore';
import { useEmployee_Edit,useEmployee_Fetch,useEmployee$Photo_Edit } from 'actions/Employee';
import useApiRequest from 'api/useApiRequest';
import feature from '../../feature';
import Avatar from 'components/Avatar';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

let profilePicContainerStyle = {
   minWidth: "25%",
   justifyContent: "center",
   // display: "inline-block",
   verticalAlign: "top"
}

let formContainerStyle = {
   // display: "inline-block",
   minWidth: "75%"
}

function EmployeeEdit({match}){
   let employeeAvatarOverlayRef = useRef({});

   // let fetchEmployee = useEmployee_Fetch();
   // let editEmployee = useEmployee_Edit();
   // let uploadEmployeePhoto = useEmployee$Photo_Edit();
   let fetchEmployee = useApiRequest("EMPLOYEE_READ",dispatch);

   let {getAppState} = useAppStore();
   let employeeFromStore = (getAppState().employees||[]).find(emp=> emp._id === match.params.id);
   let [employee,setEmployee] = useState(employeeFromStore);
   let [employeePhotoURL,setEmployeePhotoURL] = useState((employee || {}).photoURL);  

   let formClasses = useStyles();
   
   //always get the fresh copy
   useEffect( () => { fetchEmployee(match.params.id) } ,[match.params.id] );
   
   useEffect(()=>{
      if(employeeFromStore){
         setEmployee(employeeFromStore);
         if(employeeFromStore.photoURL){
            setEmployeePhotoURL(employeeFromStore.photoURL);
            return ()=>{URL.revokeObjectURL(employeeFromStore.photoURL)};
         }
      }
      
   },[employeeFromStore]);

   useEffect(()=>{
    if(employeePhotoURL){
      setEmployeePhotoURL(employeeFromStore.photoURL);
      return ()=>{URL.revokeObjectURL(employeeFromStore.photoURL)};
    }
   },[employeePhotoURL]);


   const formSubmitHandler = (e)=>{
      e.preventDefault();
      let editedEmployee = Object.assign({},employee);
      delete editedEmployee.photo;
      delete editedEmployee.photoURL;
      editEmployee(editedEmployee);
   }

   function employeePhotoChangeHandler(e){
      let formData = new FormData();
      formData.set(e.currentTarget.name,e.currentTarget.files[0]);
      console.log(employee._id,formData);
      uploadEmployeePhoto(employee._id,formData);
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
      <div>
         <Avatar imgURL={employee.photoURL || `/apiv1/employees/${employee._id}/photo`} photoChangeHandler={employeePhotoChangeHandler} />                               
         <form className={formClasses.root} action="#" onSubmit={formSubmitHandler}>
            <h3>Employee Id: {employee.employeeId}</h3>
               <h3>Personal Information</h3>
               <hr/>
               <div>
                  <TextField fullWidth label="Firstname" type="text" name="firstname" value={employee.identity.firstname} onChange={changeHandler} required/>
                  <TextField fullWidth label="Middlename" type="text" name="middlename" value={employee.identity.middlename} onChange={changeHandler}/>
                  <TextField fullWidth label="LastName" type="text" name="lastname" value={employee.identity.lastname} onChange={changeHandler} required/>
               </div>
               <div>
                  <TextField label="Date Of Birth" type="date" name="dateOfBirth" value={employee.identity.dateOfBirth} onChange={changeHandler} required/>
                  {/* <FormControl>
                     <InputLabel id="emp-gender-label">Gender</InputLabel>
                     <Select labelId="emp-gender-label" name="gender" value={employee.identity.gender} onChange={changeHandler} required>
                        <option value={null}>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                     </Select>
                  </FormControl> */}
                  
                  <FormControl margin="dense">
                     <InputLabel id="emp-gender-label">Gender</InputLabel>
                     <Select native labelId="emp-gender-label" name="gender" value={employee.identity.gender} onChange={changeHandler} required>
                        <option value={null}>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                     </Select>
                  </FormControl>
                  
               </div>
               
               
               <h3>Address Information</h3>
               <hr/>
               <div  className="form-control">
                  <label htmlFor="country">Country</label>
                  <input type="text" name="country" value={employee.country} onChange={changeHandler}/>
               </div>
               <div  className="form-control">
                  <label htmlFor="city">City</label>
                  <input type="text" name="city" value={employee.city} onChange={changeHandler}/>
               </div>
               <div  className="form-control">
                  <label htmlFor="address">Address</label>
                  <input type="text" name="address" value={employee.address} onChange={changeHandler}/>
               </div>
               <div  className="form-control">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input type="text" name="zipcode" value={employee.zipcode} onChange={changeHandler}/>
               </div>
            
               <h3>Employee Information</h3>
               <hr/>
               <div  className="form-control">
                  <label htmlFor="joiningDate">Joining Date</label>
                  <input type="date" name="joiningDate"  value={employee.joiningDate} onChange={changeHandler}/>
               </div>
               <div  className="form-control">
                  <label htmlFor="jobTitle">Job Title</label>
                  <input type="text" name="jobTitle" value={employee.jobTitle} onChange={changeHandler}/>
               </div>
               <div  className="form-control">
                  <label htmlFor="designation">Designation</label>
                  <input type="text" name="designation" value={employee.designation} onChange={changeHandler}/>
               </div>
               <div  className="form-control">
                  <label htmlFor="department">Department</label>
                  <input type="text" name="department" value={employee.department} onChange={changeHandler}/>
               </div>
               <h3>Contacts</h3>
               <hr/>
               <div  className="form-control">
                  <label htmlFor="email">Personal Email</label>
                  <input type="email" name="email"  value={employee.email} onChange={changeHandler}/>
               </div>
               <div  className="form-control">
                  <label htmlFor="mobileNo">Personal Mobile No.</label>
                  <input type="text" name="mobileNo" value={employee.mobileNo} onChange={changeHandler}/>
               </div>
               <div  className="form-control">
                  <label htmlFor="companyIssuedEmail">Internal Email</label>
                  <input type="email" name="companyIssuedEmail" value={employee.companyIssuedEmail} onChange={changeHandler}/>
               </div>
               <div  className="form-control">
                  <label htmlFor="companyIssuedMobileNo">Internal Mobile No.</label>
                  <input type="text" name="companyIssuedMobileNo" value={employee.companyIssuedMobileNo} onChange={changeHandler}/>
               </div>
            <button type="submit" className="form-submit">Submit</button>
         </form>
      </div>
        
   )
   
}


export default feature(EmployeeEdit,{
   title: 'Employee Edit',
   shortcutLinks: [
      <FeatureShortcutLink to="/employees">View All Employees</FeatureShortcutLink>,
      <FeatureShortcutLink to="/employees/add">Add New Employee</FeatureShortcutLink>,
   ]
})


