import React, { Component, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import employeeUiSchema from 'uischemas/employee';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';


function EmployeeView(props){
   console.log(props.match);
   //params {id: jdflajfldjsaf}
   //request for the entity with this id
   return(
      <EForm title="Employee" type="reader" entity={props.location.state.entity} uischema={employeeUiSchema} actions={
         entity => [
            <Button color="primary" variant="contained">Modify</Button>,
            <Button color="primary" variant="contained">Back</Button>
         ]
      }/>
   )
}

   EmployeeView.propTypes = {};

export default EmployeeView;