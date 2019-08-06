import React, { Component, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import credentialUiSchema from 'uischemas/credential';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';


function CredentialView(props){
   console.log(props.match);
   //params {id: jdflajfldjsaf}
   //request for the entity with this id
   return(
      <EForm title="Credential" type="reader" entity={props.location.state.entity} uischema={credentialUiSchema} actions={
         entity => [
            <Button color="primary" variant="contained">Modify</Button>,
            <Button color="primary" variant="contained">Back</Button>
         ]
      }/>
   )
}

   CredentialView.propTypes = {};

export default CredentialView;