import React, { useEffect } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

export default (props)=>{
  
   return(
      <MenuList>
         <MenuItem>
            <Link to='/settings/store/general'> Basic </Link>
         </MenuItem>
         <MenuItem>
            <Link to='/settings/store/general/address'>Address</Link>
         </MenuItem>
         <MenuItem>
         <Link to='/settings/store/general/curriences'>Currencies</Link>
         </MenuItem>
       
      </MenuList>    
   )
}

