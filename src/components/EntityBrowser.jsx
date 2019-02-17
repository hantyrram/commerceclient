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
   this.initOnReadActionHandler.call(this);
  }
  
  initOnReadActionHandler(){
   let _self = this;
   let rows = document.getElementsByTagName("tr");
   for(let row of rows){
     row.addEventListener('click',function(e){
      if(e.eventPhase === Event.CAPTURING_PHASE && e.target.tagName.toLowerCase() == 'td'){
       if(e.target.className.includes("eb-entity-data")){
           //row.attributes[0] is the saved entity on tr ,MUST do additional check on attributes[0].name === ebentity
           //if additional attribute is added on the tr
           let ebentity = row.attributes[0];
           _self.props.onRead(JSON.parse(ebentity.nodeValue));
        e.stopImmediatePropagation();
       }
      }
     },true);
   }
  }

  onEditActionHandler(entity,event){
    this.props.onEdit(entity);
    event.stopPropagation();
  }

  onDeleteActionHandler(entity,event){
    console.log('Deleting');
    this.props.onDelete(entity);
    event.stopPropagation();
  } 

 render(){
  let columnNames = [];
  if(this.props.entities && this.props.entities.length > 0){
   columnNames.push('#');//number column
   let sample = this.props.entities[0];//get a sample entity just to check the property names
   columnNames = columnNames.concat(Object.getOwnPropertyNames(sample).map((samplePropName)=>{return samplePropName}));
  }

  let actions = [this.props.onEdit,this.props.onDelete];
  actions = actions.filter(a=>Boolean(a));

  let actionStyleWidth = {
    width: (actions.length > 0? 100 / actions.length : 0) + "%"
  };

  return(     
   <Div>
    {this.props.title? <EntityBrowserTitle>{this.props.title}</EntityBrowserTitle>:null}
    <div id="main-actions-container"> &nbsp;
     {this.props.onAdd? <button className="eb-action-add" onClick={this.props.onAdd}>+</button>:null}
    </div>
    {
     this.props.entities && this.props.entities.length > 0 ?
     <div id="table-container">
      <div id="table-wrapper">
        <Table id="entitybrowser-table" >
         <thead>
           <tr>
             {
               columnNames.length > 0? columnNames.map((columnName,i)=>{
                 return <th key={i}>{columnName}</th>
               }):null
             }
             <th className="fixed-column" colSpan={actions.length}>Action</th>
           </tr>
         </thead>
         <tbody ref="ebTableTbody">
           {
             this.props.entities.map((entity,index)=>{
              return <tr key={index} ebentity={JSON.stringify(entity)}> {/** Row is clickable if there is onRead handler else default = empty function*/}
                      <td >{index + 1}</td> 
                      {
                        Object.getOwnPropertyNames(entity).map((entityFieldName,i)=>{
                          let state = {};
                          let el = entity[entityFieldName];
                          if(this.props.follow && this.props.follow.column && entityFieldName === this.props.follow.column){
                            state[`${this.props.follow.entityName}`] = entity;//state.user = user
                            el = <Link to={{pathname:this.props.follow.pathname.replace(":"+this.props.follow.column,entity[this.props.follow.column]),state:{...state}}} >{entity[entityFieldName]}</Link>;
                          }
                          return <td key={i} className="eb-entity eb-entity-data" >{el}</td>
                        })
                        
                      }
                      {
                        this.props.onEdit || this.props.onDelete?
                         <td className="fixed-column eb-entity eb-entity-action " style={{zIndex:"3"}} >
                          {this.props.onEdit?<span  style={actionStyleWidth} className="eb-action-edit fas fa-edit" onClick={this.onEditActionHandler.bind(this,entity)}></span>:null}
                          {this.props.onDelete?<span  style={actionStyleWidth} className="eb-action-delete fas fa-trash" onClick={this.onDeleteActionHandler.bind(this,entity)}></span>:null}
                         </td>
                        :null
                      }
                      
                    </tr>
             })
           }
          </tbody>
        </Table>
      </div>
     
    </div>
    : <div>No available data</div>
    }
   
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
