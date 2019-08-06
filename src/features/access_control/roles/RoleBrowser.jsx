import React, { Component } from 'react';
import uischema from 'uischemas/role';
import EBrowser from 'components/EBrowser';
import rolesPromise from 'promises/rolesPromise';
export default (props)=>   
   <EBrowser uischema={uischema} entities={rolesPromise()}
      {...props}
   />