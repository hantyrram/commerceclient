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
import PropTypes from 'prop-types';
import Table from './styled_elements/Table';
import EntityBrowserTitle from './EntityBrowserTitle';
import styled from 'styled-components';
import "./EntityBrowser.css";

const Div = styled.div`
 border:1px solid #7fd7f5;
`;


class EntityBrowser extends Component{

  componentDidMount(){
    
  }

  componentDidUpdate(){
    // console.log(this.refs);
    // this.refs.ebAction.addEventListener('click',function(e){
    //   console.log(e);
    //   if(e.currentTarget.className.includes("eb-action-column")) return;
    //   console.log('Fire onRead');
    // },true);
  }
  /**
   * Stop propagation when the user clicks on the Table cell/TD with class = "eb-action-column".
   * @param {object} entity - The bounded entity
   * @param {Event} e - Event object
   */
  onReadMiddleware(entity,e){
    console.dir(e.target);
    //use .includes instead of indexOf
    if(e.target.parentNode.className.indexOf("eb-action-column") !==-1 
    ||  e.target.className.indexOf("eb-action-column") !== -1
    || e.target.className.indexOf("eb-action") !== -1 ) { // action button 
      e.preventDefault();
      return;
    }; //inside action button

    this.props.onRead(entity);
    // this.props.onRead(entity);
  }


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
      <i className="fas fa-edit"></i>
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
                 return <tr key={index} onClick={this.props.onRead?this.onReadMiddleware.bind(this,entity):()=>{}}> {/** Row is clickable if there is onRead handler else default = empty function*/}
                          <td>{index + 1}</td> 
                          {
                            Object.getOwnPropertyNames(entity).map((entityFieldName,i)=>{
                              let state = {};
                              let el = entity[entityFieldName];
                              if(this.props.follow && this.props.follow.column && entityFieldName === this.props.follow.column){
                                state[`${this.props.follow.entityName}`] = entity;//state.user = user
                                el = <Link to={{pathname:this.props.follow.pathname.replace(":"+this.props.follow.column,entity[this.props.follow.column]),state:{...state}}} >{entity[entityFieldName]}</Link>;
                              }
                              return <td key={i} >{el}</td>
                            })
                            
                          }
                          {
                            this.props.onEdit || this.props.onDelete ?
                             <td ref="ebAction" className="fixed-column eb-action-column" style={{zIndex:"3"}}><span  className="eb-action fas fa-edit" onClick={this.props.onEdit.bind({},entity)}></span></td>:
                            null
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

EntityBrowser.propTypes = {
 /** The data to tabulate, the data will be shown in a Table */
 entities: PropTypes.array,
 /** The text that will be shown at the top */
 title: PropTypes.string
}
export default EntityBrowser;
