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
 * }
 */

import React from 'react';
import {Link} from 'react-router-dom';
import Table from './styled_elements/Table';


export default ({entities,follow,schema,remove})=>{
 let columnNames = [];
 if(entities && entities.length > 0){
  columnNames.push('#');
  
  let sample = entities[0];//get a sample entity just to check the property names
  console.log(Object.getOwnPropertyNames(sample).map((samplePropName)=>{return samplePropName}));
  columnNames = columnNames.concat(Object.getOwnPropertyNames(sample).map((samplePropName)=>{return samplePropName}));
 }
  return(
    <div>
      <Table>
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
                       <td>{index + 1}</td> 
                       {
                         Object.getOwnPropertyNames(entity).map((entityFieldName,i)=>{
                         
                           let state = {};
                           let el = entity[entityFieldName];
                           if(follow && follow.column && entityFieldName === follow.column){
                             state[`${follow.entityName}`] = entity;//state.user = user
                             el = <Link to={{pathname:follow.pathname.replace(":"+follow.column,entityFieldName),state:{...state}}} >{entity[entityFieldName]}</Link>;
                           }
                           return <td key={i}>{el}</td>
                         })
                         
                       }
                       {
                         remove?<button><i className="material-icons" onClick={(e)=>{remove(entity)}}>delete_forever</i></button>:null
                       }
              </tr>
            }):<tr><td>No Available Data</td></tr>
          }
        </tbody>
      </Table>
      <div>Back Forward Navigator here</div>
    </div>
  );
}