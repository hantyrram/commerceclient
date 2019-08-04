import React, { useState, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import PermissionUiSchema from 'uischemas/permission';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';
import Feature from 'components/Feature';

function PermissionView(props){
   let initialValue = props.location && props.location.state && props.location.state.entity ?
                           props.location.state.entity : null; 
   const [permission,setPermission] = useState(initialValue);

   useEffect(()=>{
      (async ()=>{
         //fetch get props.match.params.name;
         console.log(props.match);
      })()
   },[]);

   const backHandler = ()=>{
      props.history.goBack();
   }
   return(
      <Feature group="Employees" feature="Add Employee">
         <EForm title="Permission" type="reader" entity={permission} uischema={PermissionUiSchema} actions={
         entity => [
            <Button color="primary" variant="contained" onClick={backHandler}>Back</Button>
         ]
         } />
      </Feature>
   )
}

   PermissionView.propTypes = {};

export default PermissionView;