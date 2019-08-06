import React from 'react';
import {Link} from 'react-router-dom';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
export default ()=>{
   return(
      <Feature group="Credentials" featureShortcuts={[<FeatureShortcutLink to="/credentials/create">Create Credential</FeatureShortcutLink>]}>
         
         
      </Feature>
   )
}