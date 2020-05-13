import React from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../feature';

function Permissions(props){

     
   let { getAppState,dispatch } = useAppState();
   
   let fetchPermissions = useApiRequest('PERMISSION_LIST',dispatch, ({responseData})=>{
      return responseData.resource;
   });

   let { permissions } = getAppState();

   React.useEffect(function(){
      fetchPermissions();
   },[]);

   return(
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
   )
}

export default feature(Permissions,{
   title: 'Permissions'
})