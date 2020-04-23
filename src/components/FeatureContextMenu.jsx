import React, { useEffect } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

export default ({ links })=>{
   return(
      <MenuList>
         {
            links.map((link)=>{
               return (
                  <MenuItem>
                     <Link to={link.to}>{link.label}</Link>
                  </MenuItem>
               )
            })
         }
      </MenuList>    
   )
}

