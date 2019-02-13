/**
 * Used for tabular representation of data, supports pagination of data.
 * props : {
 *  entities : The entities to tabulate and paginate
 *  follow : An object which represents a column value that is a Link to a path.
 *             : { 
 *                 pathname: REQUIRED! The pathname e.g. /users/:username
 *                 column:  REQUIRED! The entity property  e.g. if entities contains array of users then setting this
 *                          value to "username" will replace the :username on the path with "username".
 *                          The column values of "username" will be a Link.
 *                 entityName: REQUIRED! The name of the entity e.g. user, This is used as property of the location.state. 
 *               }
 *  remove : [OPTIONAL] A function that will handle the delete button click event.
 *  title: [OPTIONAL] The Title shown on top of the Entity Browser.
 *  onAdd: [OPTIONAL] The handler for the add button.Which is used to add a new Entity.
 * }
 */

import React from 'react';
import {Link} from 'react-router-dom';
import Table from './styled_elements/Table';
import EntityBrowserTitle from './EntityBrowserTitle';
import styled from 'styled-components';

const Div = styled.div`
 border:1px solid #7fd7f5;
`;

const contentRowStyle = {
 position:"relative"
};

const tableWrapStyle = {
 overflow:"scroll",
};


export default ({entities,follow,schema,remove,title,onAdd})=>{
 let columnNames = [];
 if(entities && entities.length > 0){
  columnNames.push('#');//number column
  
  let sample = entities[0];//get a sample entity just to check the property names
  columnNames = columnNames.concat(Object.getOwnPropertyNames(sample).map((samplePropName)=>{return samplePropName}));
 }
  return(
    <Div>
      {title? <EntityBrowserTitle>{title}</EntityBrowserTitle>:null}
      <div>Actions Row
      {onAdd? <button onClick={onAdd}>+</button>:null}
      </div>
      <div id="content-row">Content Row
        <div id="table-wrap">
          <Table id="entity-browser-table">
           <thead>
             <tr>
               {
                 columnNames.length > 0? columnNames.map((columnName,i)=>{
                   return <th key={i}>{columnName}</th>
                 }):null
               }
             </tr>
           </thead>
           <tbody>
             {
                entities && entities.length > 0?entities.map((entity,index)=>{
                 return <tr key={index}>
                          <td >{index + 1}</td> 
                          {
                            Object.getOwnPropertyNames(entity).map((entityFieldName,i)=>{
                              let state = {};
                              let el = entity[entityFieldName];
                              if(follow && follow.column && entityFieldName === follow.column){
                                state[`${follow.entityName}`] = entity;//state.user = user
                                el = <Link to={{pathname:follow.pathname.replace(":"+follow.column,entity[follow.column]),state:{...state}}} >{entity[entityFieldName]}</Link>;
                              }
                              return <td key={i} contenteditable={"true"}>{el}</td>
                            })
                            
                          }
                          {
                            <td className="table-action-fixed">edit</td>
                          }
                 </tr>
               }):<tr><td>No Available Data</td></tr>
             }
            </tbody>
          </Table>
        </div>
        <div>
         Action
        </div>
      </div>
      
      
      <div>Back Forward Navigator here</div>
    </Div>
  );
}