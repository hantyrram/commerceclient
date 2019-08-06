import React from 'react';
import {Link} from 'react-router-dom';
import EBrowser from 'components/EBrowser';
import permissionUiSchema from 'uischemas/permission';
import {PermissionBrowseRequest} from 'requests';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
export default (props)=>{
   
   const entitiesPromise = new Promise((res,rej)=>{
      (async ()=>{
         let request = new PermissionBrowseRequest();
         console.log(request);
         let artifact = await request.send();
         res(artifact.data.entity);
      })()
   });

   const ebrowserReadHandler = (entity)=>{
      props.history.push('/permissions/' + entity.name, {entity});
   }

   return(
      <Feature group="Permissions" >
         <EBrowser uischema={permissionUiSchema} entities={entitiesPromise} onRead={ebrowserReadHandler}/>
      </Feature>
      
   )
}