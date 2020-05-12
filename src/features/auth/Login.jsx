import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';
import feature from 'features/feature';

export default function Login (props){

   // let U_SID;
   //  if(document.cookie){
   //    U_SID = document.cookie.split(';').find(c=>{
   //      return c.trim().split('=')[0] === 'U_SID';
   //    });
   //  }
   const { getAppState, dispatch } = useAppState();
   const login = useApiRequest('AUTH$LOGIN_EXEC',dispatch);

   const onSubmitCallback = ({values}) => {
      login({payload: values});
   }
   // const [sessionCookie,setSessionCookie] = useState(U_SID);
   const { values,errors,onChange,onSubmit } = useForm({initialValues:{},onSubmitCallback});
   
   // const authenticate = useApiRequest("AUTH$AUTHENTICATE_EXEC",dispatch);   


   // const authenticate = ()=>{
   //    if(sessionCookie){
   //       (async ()=>{
   //          try {
   //             let artifact = await authentication();
   //             if(artifact.status === 'ok'){
   //                setCredential(artifact.data.entity);
   //                return;
   //             }
   //             setSessionCookie(null);
   //          } catch (error) {
   //             console.log(error);
   //             setSessionCookie(null);
   //          }
   //       })()
   //    }
   // }

   // useEffect(()=>{
   //    if(sessionCookie){
   //       authenticate();
   //    }
   // },[]);

   return(
      <div id="feature-login">
         <form action="" onSubmit = {onSubmit} className="grid-form padded bordered">
            <div className="form-control">
               <label htmlFor="username">Username </label>
               <input type="text" name="username" value={values.username} onChange={onChange} className="form-control-input"/>
               <span className="form-input-error">{errors && errors.username}</span>
            </div>
            <div className="form-control">
               <label htmlFor="password">Password </label>
               <input type="text" name="password" value={values.password} onChange={onChange} className="form-control-input"/>
               <span className="form-input-error">{errors && errors.password}</span>
            </div>
            <div className="form-control-action">
               <Button type="submit" variant="contained">
                  Login
               </Button> 
            </div>
      </form>   
      </div>
      
      
   )

}


