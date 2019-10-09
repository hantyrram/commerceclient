import React, { Component } from 'react';
import uischema from 'uischemas/role';
import EBrowser from 'components/EBrowser';
import rolesPromise from 'promises/rolesPromise';
import searchPromise from 'promises/searchPromise';
export default (props)=>   
   <EBrowser uischema={uischema} entities={props.search? searchPromise('role',props.search): rolesPromise}
      {...props}
   />