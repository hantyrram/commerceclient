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

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Table from './styled_elements/Table';
import EntityBrowserTitle from './EntityBrowserTitle';
import styled from 'styled-components';
import "./EntityBrowser.css";

const Div = styled.div`
 border:1px solid #7fd7f5;
`;


class EntityBrowser extends Component{


 render(){
  let columnNames = [];
  if(this.props.entities && this.props.entities.length > 0){
   columnNames.push('#');//number column
   
   let sample = this.props.entities[0];//get a sample entity just to check the property names
   columnNames = columnNames.concat(Object.getOwnPropertyNames(sample).map((samplePropName)=>{return samplePropName}));
  }
  
  return(
     
     <Div>
      {this.props.title? <EntityBrowserTitle>{this.props.title}</EntityBrowserTitle>:null}
      <div>Actions Row
      {this.props.onAdd? <button onClick={this.props.onAdd}>+</button>:null}
      </div>
      <div id="table-container">Content Row
        <div id="table-wrapper">
          <Table id="entitybrowser-table" >
           <thead>
             <tr>
               {
                 columnNames.length > 0? columnNames.map((columnName,i)=>{
                   return <th key={i}>{columnName}</th>
                 }):null
               }
               <th className="fixed-column">Action</th>
             </tr>
           </thead>
           <tbody>
             {
                this.props.entities && this.props.entities.length > 0?this.props.entities.map((entity,index)=>{
                 return <tr key={index}>
                          <td>{index + 1}</td> 
                          {
                            Object.getOwnPropertyNames(entity).map((entityFieldName,i)=>{
                              let state = {};
                              let el = entity[entityFieldName];
                              if(this.props.follow && this.props.follow.column && entityFieldName === this.props.follow.column){
                                state[`${this.props.follow.entityName}`] = entity;//state.user = user
                                el = <Link to={{pathname:this.props.follow.pathname.replace(":"+this.props.follow.column,entity[this.props.follow.column]),state:{...state}}} >{entity[entityFieldName]}</Link>;
                              }
                              return <td key={i} contentEditable={"true"}>{el}</td>
                            })
                            
                          }
                          {
                            <td className="fixed-column" ><button onClick={this.props.onEdit}>edit</button></td>
                          }
                 </tr>
               }):<tr><td>No Available Data</td></tr>
             }
            </tbody>
          </Table>
        </div>
       
      </div>
    </Div>
  )
 }
}

export default EntityBrowser;
