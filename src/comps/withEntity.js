import React from 'react';

/**
 * High order component,passes Entity to the EntityHandler.
 */

export default function withEntity(EntityHandler,entity){
 return(
  <EntityHandler entity={entity} />
 )
}