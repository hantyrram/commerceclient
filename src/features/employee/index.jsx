import React from 'react';
import EmployeeList from './List';
import feature from '../feature';

function Index(props){
   return(<EmployeeList {...props}/>)
}


export default feature(Index, {
   title: 'Employees'
})