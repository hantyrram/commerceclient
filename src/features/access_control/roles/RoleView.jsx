import React, { Component, useEffect,useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import roleUiSchema from 'uischemas/role';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';
import RolePermissions from './RolePermissions';
import Feature from 'components/Feature';



function RoleView(props){
   console.log(props.match);
   //params {id: jdflajfldjsaf}
   //request for the entity with this id
   let role = props.location.state.entity;

   const [eformType,setEformType] = useState('reader');

   const backClickHandler = ()=>{
      props.history.goBack();
   }
   const modifyClickHandler = ()=>{
      setEformType('editor');
   }
   console.log(role);

   return(
      <Feature group="Roles">
      <EForm title="Role Detail" type={eformType} entity={props.location.state.entity} uischema={roleUiSchema} 
         actions={
            entity => [
               <Button color="primary" variant="contained" onClick={modifyClickHandler}>Modify</Button>,
               <Button color="primary" variant="contained" onClick={backClickHandler}>Back</Button>
            ]}
         permissions={
            ()=><Link to={{pathname: `/roles/${role._id}/permissions`, state: {entity: role} } }>View Permissions</Link>
            // ()=><RolePermissionsReader role={props.location.state.entity}/>
         }
      />
      </Feature>
   )
}

   RoleView.propTypes = {};

export default RoleView;