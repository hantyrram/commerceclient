import React, { Component, useContext, useEffect } from 'react';
import axios from '../../axios';
import useFetchPermissions from 'action_creators/useFetchPermissions';
import EBrowser from 'components/EBrowser';
import StateContext from 'contexts/StateContext';
import resourceUISchema from 'uischemas/resource';
import Feature from 'components/Feature';

function Permissions(props){

     
   let { getStore,dispatch } = useContext(StateContext);
   let fetchPermissions = useFetchPermissions();
   let { permissions } = getStore();

   useEffect(function(){
      fetchPermissions();
   },[]);

   return(
      <Feature group="Admin / Permissions" >
         {/* <EBrowser entities={permissions || []} uischema={resourceUISchema}/> */}
         <table>
            <thead>
               <th>Resource</th>
               <th>Action</th>
            </thead>
            <tbody>
               {
                  (permissions || []).map(permission=>{
                     let resource  = Object.getOwnPropertyNames(permission)[0];
                     let actions = Object.getOwnPropertyNames(permission[resource]);
                     let row = <tr>
                        <td>{resource}</td>
                        <td>{JSON.stringify(actions)}</td>
                     </tr>

                     return row;
                  })
               }
            </tbody>
         </table>
      </Feature>
   )
}

export default Permissions;