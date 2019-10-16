import React, { useState,useEffect, useRef } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../../feature';
import useVerifyEmployee from 'actions/useVerifyEmployee';
import useGenerateCredential from 'actions/useGenerateCredential';
import useCreateUserAccountCredential from 'actions/useCreateUserAccountCredential';

function UserAccountCreate(props){

   const verifyEmployee = useVerifyEmployee();
   const generateCredential = useGenerateCredential();
   const createUserAccountCredential = useCreateUserAccountCredential();
   const [employeeId,setEmployeeId] = useState(null);
   const [employeeVerified,setEmployeeVerified] = useState(null);
   const [credential,setCredential] = useState(null);

   const employeeIdVerifySubmitHandler = (e)=>{
      e.preventDefault();
      setEmployeeVerified(null);//reset
      setCredential(null);//reset 
      (async function(){
            let verifiedEmployee = await verifyEmployee(employeeId);
            if(verifiedEmployee){
               setEmployeeVerified(verifiedEmployee);
            }
      })()
   }


   const employeeIdChangeHandler = (e)=>{
      setEmployeeId(e.target.value);
   }

   const credentialInputHandler = (e)=>{
      setCredential({...credential,[e.target.name]:e.target.value});
      console.log(credential);
   }
  
   const saveBtnClickHandler = ()=>{
      console.log(credential);
      createUserAccountCredential(employeeVerified,credential);
   }  

   const genCredentialBtnClickHandler = ()=>{
      (async function(){
         let generatedCredential = await generateCredential(employeeId);
         if(generatedCredential){
            setCredential(generatedCredential);
         }
      })() 
   }

   return(
      
      <React.Fragment>
         <form id="employeeIdVerify" action="#" onSubmit={employeeIdVerifySubmitHandler}>
            <h3>Employee Id</h3>
               <div>
                  <label htmlFor="employeeId">Enter Employee Id</label>
                  <input type="text" name="employeeId" value={employeeId || ''} onChange={employeeIdChangeHandler} minLength="6"/>
                  <button type="submit">Verify Employee Id</button>
                  { 
                     employeeVerified ? 
                        <div>
                           <label htmlFor="">Employee Name </label> 
                        <label htmlFor="">{`${employeeVerified.identity.firstname} ${employeeVerified.identity.middlname} ${employeeVerified.identity.lastname}`}</label> 
                        </div>
                     : null 
                  }
               </div>
         </form>
         {
            employeeVerified ?
               <form id="temporaryCredential" action="#" onSubmit={(e)=>{e.preventDefault()}}>
                  <h3>Credential</h3>
                  <div>
                     <label htmlFor="username">Username</label>
                     <input type="text" name="username" value={(credential||{}).username} onChange={credentialInputHandler}/>
                  </div>
                  <div>
                     <label htmlFor="password">Temporary Password</label>
                     <input type="text" name="password" value={(credential||{}).password} onChange={credentialInputHandler}/>
                  </div>
                  <button id="userAccountCreate-generateCredential" onClick={genCredentialBtnClickHandler}>Generate Credential</button>
                  {
                     credential ? <button id="userAccountCreate-Save" onClick={saveBtnClickHandler}>Save</button> : null
                  }
                  
               </form>
            :null
         }
      </React.Fragment>
   )
   
}


export default feature(UserAccountCreate,{
   title: 'User Account / Create New',
   shortcutLinks: [
      <FeatureShortcutLink to="/admin/useraccounts">View User Accounts</FeatureShortcutLink>
   ]
})



