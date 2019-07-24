import React, { Component, useEffect,useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import employeeUiSchema from 'uischemas/employee';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';
import { EmployeeAddRequest } from 'requests';


export default ()=>{
   return(
      <div>
         Employees 
         <Link to="/employees/add">Add Employee</Link>
      </div>
   )
}