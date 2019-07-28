import React, { useState, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import PermissionUiSchema from 'uischemas/permission';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';


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
   return(
      <EForm title="Permission" type="reader" entity={permission} uischema={PermissionUiSchema} actions={
         entity => [
            <Button color="primary" variant="contained">Back</Button>
         ]
      }/>
   )
}

   PermissionView.propTypes = {};

export default PermissionView;