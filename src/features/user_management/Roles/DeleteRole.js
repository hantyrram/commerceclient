import React from 'react';
import axios from '../../../axios';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import Button from '@material-ui/core/Button';

/**
 * Deletes the given role
 * @namespace Features.Roles
 * @type {actionHandler}
 * 
 */
export default function DeleteRole({entity}){
 console.log(entity);
 return(
  <Button onClick={()=>console.log(entity)}>
   <DeleteIcon />
  </Button>
 )
}