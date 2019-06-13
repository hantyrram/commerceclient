//Perform Browse, Read, Add, edit, delete and other special functionalities
//Minimum permission required = permission_read for this feature to appear on the menu
//displayed as Permissions
//Under User Management Feature Group

//how Feature works
//feature advertises the supported actions it can do, each action requires certain permission action name maps to permission name
 //E.g. Permissions.supportedActions = [permission_browse,permission_read,permission_edit]
 // Action = {name:permission_browse,route:<if any e.g. delete is not a routable feature>}

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import featureGroups from '../featureGroups';


function Permissions(){}

//Minimum Required Permission for the feature to be available
Object.defineProperty(Permissions,'path',{ get: () => '/permissions'});
Object.defineProperty(Permissions,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Permissions,'primaryLink',{ get: () => true});
Object.defineProperty(Permissions,'requiredPermission',{ get: () => 'permission_read' });
