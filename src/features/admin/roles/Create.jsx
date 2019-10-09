import React, { useContext,useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import uischema from 'uischemas/role';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';
import useCreateRole from 'actions/useCreateRole';
import StateContext from 'contexts/StateContext';
import {emit} from 'actionEvent';
import actionTypes from 'actions/types';

export default ({history})=>{

   
   let {getStore} = useContext(StateContext);
   let createRole = useCreateRole();

   const createRoleClickHandler = function(entity,e){
     createRole(entity);
   }
   
   // if(getStore().lastAction === actionTypes.){
   //    // emit(getStore().lastAction);
   //    // console.log(getStore().lastActionPayload);
   //    history.push(getStore().lastActionPayload._id);
   // }
   

   return(
      <Feature group="Roles / Create" featureShortcuts={[<FeatureShortcutLink to="/admin/roles/create">Create Role</FeatureShortcutLink>]}>
         <EForm uischema={uischema} type="adder" 
               actions = {(entity)=>
                  [
                     <Button onClick={createRoleClickHandler.bind({},entity)}>Save</Button>
                  ]
               }
         />
      </Feature>
   )
   
}


