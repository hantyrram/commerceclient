import React, { useEffect } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

export function Feature({title,children}){
   return(
      <div class="feature">
            <div class="feature-header">
               <div class="feature-title">{title}</div>
            </div>
            {children}      
         </div>
   )
}

export function FeatureContextMenu({locations = []}){
   return(
      <MenuList>
         {
            locations.map( path => 
                  <MenuItem>
                     <Link to={locations.pathname}>{locations.label}</Link>
                  </MenuItem>
            )
         }
      </MenuList>    
   )
}

export function FeatureContext({title,ContextMenu}){
   return(
      <div class="feature-content">
         <div class="feature-context-title">{title}</div>
         <hr class="feature-context-title-separator" />
         <div class="feature-context-content-wrapper">
            <div class="feature-context-content">
               {children}
            </div>
            {
               ContextMenu ? <div class="feature-context-menu">
                  <ContextMenu />
               </div> : null
            }
         </div>   
      </div> 
   )
}


