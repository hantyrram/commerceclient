import React, { useEffect } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useMenuItemStyles = makeStyles({
   root: {
      fontSize: "unset",
      lineHeight:"unset",
      "&:hover": {
         fontWeight: 430,
         backgroundColor: "var(--border-and-line-color)"
      }
   }
});

export default ({ links })=>{
   const classes = useMenuItemStyles();
   return(
      <MenuList>
         {
            links.map((link,i)=>{
               return (
                  <MenuItem classes={{...classes}} key={i}>
                     <Link to={link.to}>{link.label}</Link>
                  </MenuItem>
               )
            })
         }
      </MenuList>    
   )
}

