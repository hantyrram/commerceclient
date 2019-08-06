import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import EBrowser from 'components/EBrowser';
import roleUiSchema from 'uischemas/role';
import {RoleBrowseRequest,RoleDeleteRequest} from 'requests';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import RoleBrowser from './RoleBrowser';

export default (props)=>{
   
   const entitiesPromise = new Promise((res,rej)=>{
      (async function(){
         let request = new RoleBrowseRequest();
         let artifact = await request.send();
         if(artifact.status === 'ok'){
            res(artifact.data.entity);
         }
      })()
   });

   const ebrowserReadHandler = (role)=>{
      props.history.push(`/roles/${role._id}`, {entity: role});
   }

   const deleteRolePromise = async (role)=>{
      try {
         let deleteRole = new RoleDeleteRequest(role._id);
         let artifact = await deleteRole.send();
         if(artifact.status === 'ok'){
            return true;
         }
         return false;
      } catch (error) {
         console.log(error);//???send error to server ReportErrorRequest();
         return false;
      }
   }
   return(
      <Feature group="Roles" featureShortcuts={[<FeatureShortcutLink to="/roles/create">Create Role</FeatureShortcutLink>]}>
         <RoleBrowser 
            onRead={ebrowserReadHandler}
            actions={[{type:'delete'}]}
            onDelete={deleteRolePromise}/>
      </Feature>
   )
}