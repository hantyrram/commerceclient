import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';
import {ErrorBox} from '../feature';
import { subscribe } from '../../actionEvent';

export default function Login (props){

   const { getAppState, dispatch } = useAppState();
   const login = useApiRequest('AUTH$LOGIN_EXEC',dispatch);
   const [error, setError] = useState(null);
   
   const onSubmitCallback = ({values}) => {
      login({payload: values});
   }
   const { values,errors,onChange,onSubmit } = useForm({initialValues:{},onSubmitCallback});
   
   useEffect(()=>{
      //Note: returning unsubscribe
      return subscribe('error', (error)=>{
         setError(error);
      });
      
   });

   return(
      <div id="feature-login">
         { error && getAppState().lastAction === 'AUTH$LOGIN_EXEC_NOK' ? <ErrorBox error={error} /> : null }
         <form action="" onSubmit = {onSubmit} className="grid-form padded bordered">
            <div className="form-control">
               <h3>Login</h3>
               <hr/>
            </div>
            <div className="form-control">
               <label htmlFor="username">Username </label>
               <input type="text" name="username" value={values.username} onChange={onChange} className="form-control-input"/>
               <span className="form-input-error">{errors && errors.username}</span>
            </div>
            <div className="form-control">
               <label htmlFor="password">Password </label>
               <input type="password" name="password" value={values.password} onChange={onChange} className="form-control-input"/>
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


