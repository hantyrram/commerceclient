import React, { useState, useEffect } from 'react';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';
import Avatar from 'components/Avatar';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import feature from '../feature';



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

function View({match}){

   let { getAppState, dispatch } = useAppState();
   let fetchEmployee = useApiRequest('EMPLOYEE_READ',dispatch);
   let editEmployee = useApiRequest('EMPLOYEE_EDIT',dispatch);
   let uploadEmployeePhoto = useApiRequest('EMPLOYEE$PHOTO_EDIT',dispatch);

   // let employeeFromStore = getAppState().employees.find(emp=> emp._id === match.params.id);
   // let [employee,setEmployee] = useState(employeeFromStore);
   let employee = getAppState().employees.find(emp=> emp._id === match.params.id) || {};
   let md5 = employee.photo && employee.photo.md5 || '';
   let formClasses = useStyles();
   
   //always get the fresh copy
   useEffect( () => { 
         fetchEmployee({ params: { employeeId: match.params.id}});
   },[match.params.id] );

   const formSubmitHandler = (e)=>{
      e.preventDefault();
      let editedEmployee = Object.assign({},employee);
      delete editedEmployee.photo;
      delete editedEmployee.photoURL;
      editEmployee({params: {employeeId: editedEmployee._id},payload: editedEmployee});
   }

   function employeePhotoChangeHandler(e){
      let formData = new FormData();
      formData.set(e.currentTarget.name,e.currentTarget.files[0]);
      console.log(employee._id,formData);
      // uploadEmployeePhoto(employee._id,formData);
      uploadEmployeePhoto({params: {employeeId: employee._id}, payload: formData});
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
      <div className="feature-context">
         {/* md5 here is only used to bust image browser cache,it does not have any implication on the request */}
         <Avatar imgURL={`/apiv1/employees/${employee._id}/photo?md5=${md5}`} photoChangeHandler={employeePhotoChangeHandler} />                               
         <form className={formClasses.root} action="#" onSubmit={formSubmitHandler} className="grid-form">
               <h3>Employee Id: {employee.employeeId}</h3>
               <h3>Personal Information</h3>
               <hr/>
               <div  className="form-control">
                  <label htmlFor="firstname">Firstname</label>
                  <input type="text" name="firstname" value={employee.identity.firstname} onChange={changeHandler} required className="form-input-control"/>
               </div>
               <div  className="form-control">
                  <label htmlFor="middlename">Middlename</label>
                  <input type="text" name="middlename" value={employee.identity.middlename} onChange={changeHandler} required/>
               </div>
               <div  className="form-control">
                  <label htmlFor="lastname">Lastname</label>
                  <input type="text" name="lastname" value={employee.identity.lastname} onChange={changeHandler} required/>
               </div>
               <div  className="form-control">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={employee.identity.dateOfBirth} onChange={changeHandler} required/>
               </div>
               <div  className="form-control">
                  <label htmlFor="dateOfBirth">Gender</label>
                  <select name="gender" value={employee.identity.gender} required>
                     <option value={null}>Select Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                  </select>
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
               <div  className="form-control-action">
                  <Button type="submit" className="form-submit" variant="contained">Save</Button>
               </div>
            
         </form>
      </div>
        
   )
   
}


export default feature(View,{title : 'Employee'});


