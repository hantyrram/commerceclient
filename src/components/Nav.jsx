import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Styled from 'styled-components'

const NavWrapper = Styled.div`
   display:flex;
   flex-direction:column;
   justify-content:space-evenly;
   
`;

const MenuTrigger = Styled.div`
   cursor:default;
   color:#415677;
   text-align:center;
`;

const MenuContent = Styled.div`
   text-align:center;
`
const Menu = Styled.ul`
   cursor: default;
   color: #415677;
   margin-bottom: .2em;
   margin-top:0;
   text-align:right;
   & :hover {
      text-shadow: -1px 1px 1px #a6adb9;
      color: #09224a;      
   }
   & > li {
      text-align:left;
      // margin-left: 1em;
      // margin-top: .2em;
      margin-bottom: .2em;
      list-style-type:none;
   }
   & > li:hover {
      text-shadow: -1px 1px 1px #a6adb9;
      color: #09224a;
   }

`

const MenuItem = Styled.li`
   &:last-child{
      margin-bottom: 0;
   }
`


  
   
   // var visible = false;
   // document.getElementById("x").style.display = 'none';
   
   // Array.from(document.getElementsByClassName("menu-trigger")).forEach(menuTrigger=>{
   
   // console.log(menuTrigger.attributes["content-id"].value);
   // document.getElementById(menuTrigger.attributes["content-id"].value).style.display = 'none';
   // menuTrigger.addEventListener('click',function(e){
   // // console.log(event.eventPhase === Event.CAPTURING_PHASE);
   // // console.log(event);
   // // for(let child of document.getElementById("x").children)
   // // {
   // // if(!child.className.match(/^menu-item$/)) continue;
   // //
   // // child.style.display = visible? 'none': 'block';
   // //
   //  // }
   // document.getElementById(menuTrigger.attributes["content-id"].value).style.display = visible? 'none': 'block';
   // visible = visible ? !visible : true;
   
   // },true);
   
   // })

export default function Nav(props){

   return(
      <NavWrapper>
      {
         props.menus.map( menu=> <>
            <MenuTrigger forMenu={menu.id}>{menu.label}</MenuTrigger>
            <MenuContent >
               <Menu id={menu.id}>
                  {props.menuItems.filter(menuItem => menuItem).map(m=> <MenuItem>{m.link}</MenuItem>)}
               </Menu>
            </MenuContent>
         </>
         )
      }
      </NavWrapper>
         
   )
}


Nav.propTypes = {
   /**
    * 
    */
   menus: PropTypes.arrayOf(PropTypes.shape({
      /**
       * Unique identifier of the menu
       */
      id: PropTypes.string.isRequired,
      /**
       * The label of the Menu. e.g Products
       */
      label: PropTypes.string.isRequired,
   })),

   /**
    * 
    */
   menuItems: PropTypes.arrayOf(PropTypes.shape({
      /**
       * The id of the menu, if present the menu item will be put under the menu.
       */
      menuId: PropTypes.string,

      /**
       * The Link
       */
      link: PropTypes.arrayOf(Link).isRequired,
      
   }))

}