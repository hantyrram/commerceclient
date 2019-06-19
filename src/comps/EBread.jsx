import React, { useState,useEffect} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import EntityBrowser from './EntityBrowser';
import EFormAdd from './EFormAdd';
import EFormRead from './EFormRead';
import EBreadForm from './EBreadForm';
import PropTypes from 'prop-types';


export default props => {
 
 const {match,location,history} = props;

 const [entities,setEntities] = useState(props.entities); //pass this up when EBread is wrapped in a Feature, No Need to save state
 const [currentEntity,setCurrentEntity] = useState({});

 const onSave = (entity) => {
  setEntities([...entities,entity]);//update to immediately reflect on entitybrowser
  props.onSave(entity);//delegate
 }


 const onRead = entity =>history.push(`${props.readPath.replace(":id",entity._id)}`,{entity});
 const onEdit = entity => history.push(`${props.editPath.replace(":id",entity._id)}`,{entity});
 const reader = mlh => <div> {JSON.stringify(mlh.location.state.entity)} </div>
 const editor = mlh => <div> {JSON.stringify(mlh.location.state.entity)} </div>

 return(
  <div className="boxed">
      <Switch>
       <Route path={props.addPath} exact render={mlh=>
        <EFormAdd UISchema={props.UISchema} onSave={onSave} {...mlh}/>} 
       /> 
       <Route path={props.editPath} exact render={ editor}/> 
       <Route path={props.readPath} exact render={ reader}/> 
      </Switch>
      <EntityBrowser 
        title="Users"
        UISchema={props.UISchema} 
        entities={props.entities}  
        onEdit={onEdit} 
        onDelete={props.onDelete} 
        readPath={props.readPath} 
        addPath={props.addPath} 
        onRead={onRead} 
        />
      
  </div>
 )
}
