import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Feature from 'components/Feature';
import useApiRequst from 'api/useApiRequest';

// import {useEmployee_Verify} from 'actions/Employee';
// import useGenerateCredential from 'actions/useGenerateCredential';
// import useCreateUserAccountCredential from 'actions/useCreateUserAccountCredential';

const ViewUserAccounts = (props) => <Link to="/useraccounts">View User Accounts</Link> 

export default function UserAccountCreate(props){

   // const verifyEmployee = useEmployee_Verify();
   // const verifyEmployee = useApiRequest('EMPLOYEE_VERIFY',dispatch);

   // const generateCredential = useGenerateCredential();
   // const generateCredential = useApiRequst('EMPLOYEE$USERACCOUNT$CREDENTIAL_GENERATE',dispatch);   
   // const createUserAccountCredential = useCreateUserAccountCredential();
   // const createUserAccountCredential = useApiRequest('');
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
      
      <Feature title="Create New User Account" actions={[<ViewUserAccounts className="feature-action contained primary"/>]}>
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
      </Feature>
   )
   
}




