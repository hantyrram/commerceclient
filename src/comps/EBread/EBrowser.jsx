import React, { useState, useEffect, useReducer,useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import {ComponentContainer} from '../styled';

const TableContainer = styled.div`
 font-family: 'Roboto Slab',sans-serif;
 min-width:100%;
 width: 100%;
 overflow: hidden;
 position:relative;
 text-align:center;
`;

const TableWrapper = styled.div`
 min-width:100%;
 overflow-x:auto;
`;

const Table = styled.table`
 border-collapse: collapse;
 min-width:100%;
 // margin-bottom: .5em;
 & tr {
  border-top: 1px solid #d6cccc;
 }
 & tr:hover{
  background-color:#f3ffee;
 }
`;

const Th = styled.th`
 white-space:nowrap;
 padding: .5em;
 text-align:left;
`;

//border-box,because the DummyTd width depends on the computed style of Fixed
const ThFixed = styled(Th)`
 position:absolute;
 right: 0px;
 min-width:8%;
 background-color:white;
 box-sizing:border-box; 
 text-align:center;
`;

const Td = styled.td`
 white-space:nowrap;
 padding: .5em;
 cursor:default;
`;

//border-box,because the DummyTd width depends on the computed style of Fixed
const TdFixed = styled(Td)`
 padding-top:.2em;
 padding-bottom:0px;
 position:absolute;
 right: 0px;
 min-width:8%;
 border-top:none;
 background-color:white;
 box-sizing:border-box; 
`;

const DummyTd = styled.td`
 border-bottom:none;

`;

const StyledDeleteIcon = styled(DeleteIcon)`
 &:hover {
  background-color: #ebe4e4;
  border-radius: 25px;
  padding: .1em;
 }
 color:#118d08eb;
 margin-left:.1em;
 margin-right:.1em;
`;

const StyledEditIcon = styled(EditIcon)`
 &:hover {
  background-color: #ebe4e4;
  border-radius: 25px;
  padding: .1em;
 }
 color:#bd3d30eb;
 margin-left:.1em;
 margin-right:.1em;
`;




function EBrowser(props){
  let columns = Object.keys(props.UISchema);
  let [entities,setEntities] = useState([]);
  let [filteredEntities,setFilteredEntities] = useState([]);
               
   
  function onChangeHandler(e){
   let searchStr = e.target.value;
   (async ()=>{
    let filtered = entities.filter((entity)=>{
     let truthAccumulator;
     if(props.searchLookUpFields && props.searchLookUpFields.length>0){
      for(let field of props.searchLookUpFields){//search on the searchlookUpFields
       truthAccumulator |= RegExp(`${searchStr}`,'i').test(entity[field]);
      }
     }else{
      for(let field of Object.keys(entity)){//search all prop by default
       truthAccumulator |= RegExp(`${searchStr}`,'i').test(entity[field]);
      }
     }
     
     return truthAccumulator;
    });

    // let filtered = entities.filter((e)=>RegExp(`${searchStr}`,'i').test(e.name) || RegExp(`${searchStr}`,'i').test(e.label) );
     
     setFilteredEntities(filtered); 
   })();
  }

  function initOnReadActionHandler(){
   if(props.onRead){
     let rows = document.getElementsByTagName("tr");
     for(let row of rows){
       row.addEventListener('click',function(e){
        if(e.eventPhase === Event.CAPTURING_PHASE && e.target.tagName.toLowerCase() === 'td'){
         if(e.target.className.includes("ebrowser-entity-data")){
             //row.attributes[0] is the saved entity on tr ,MUST do additional check on attributes[0].name === ebentity
             //if additional attribute is added on the tr
             let {entity}= JSON.parse(row.attributes["row-entity"].value);
             // let href = `/${pluralize(_self.props.Entity.name.toLowerCase())}/${entity[_self.props.entityPrimaryKey]}`;
             // _self.props.history.push(href,{entity});
             props.onRead(entity);
             // _self.props.history.replace(_self.props.readPath.replace(":id",entity._id),{entity});
             // console.log(_self.props.readPath.replace(":id",entity._id));
             // _self.props.history.push(_self.props.readPath.replace(":id",entity._id),{entity});
          e.stopImmediatePropagation();
         }
        }
       },true);
     }
    }
   
  }

  function onEditClickHandler(entity,e){
   console.log('Editing entity',entity);
  }

  function onDeleteClickHandler(entity,e){
   console.log('Deleting entity',entity);
  }


  const renderHeaders = ()=>{
   if(entities && entities.length > 0){
   return( 
    <thead>
     {
      props.numbered ? <Th>#</Th> : null
     }
     {
      columns.map((col,i)=> <Th key={i}>{col}</Th>)
     }
     { props.onEdit || props.onDelete ?<ThFixed className="ThFixed" colSpan="2">Action</ThFixed> : null}
    </thead>     
    )
    }
  }

  const renderRows = ()=>{
   let activeEntities = filteredEntities.length > 0?filteredEntities:entities;
   return activeEntities && activeEntities.length> 0 ? activeEntities.map((entity,index)=>
           <tr id={`ebrowser-row-${index}`} className="ebrowser-row" key={index} row-entity={JSON.stringify({entity})}>{/** Row is clickable if there is onRead handler else default = empty function*/}
            <Td className="ebrowser-entity-data">{index + 1}</Td> 
            {
              Object.getOwnPropertyNames(props.UISchema).map((uiSchemaProp,i)=>{
                let transform = props.UISchema[uiSchemaProp].transform;
                let data = entity[uiSchemaProp];
                let cellValue = data;
                if(data instanceof Array){
                 // just an ellipse,indicating that the value is an array
                 // perhaps will improve on this.
                 cellValue = <i>{`[...${uiSchemaProp}]`}</i>
                }else{
                 cellValue = data && transform? transform(data): data;
                }

                // if(data && transform){
                //  data = transform(data);
                // }
                return <Td key={i} className="ebrowser-entity-data">{cellValue}</Td>
              })
            }
            {
              props.actions && props.actions.length > 0? <>
              <DummyTd className="DummyTd" /> 
               <TdFixed className="TdFixed">
                {
                 props.actions.map(action => {
                  if(typeof action.icon === 'string'){
                   switch(action.icon){
                    case 'edit': return <StyledEditIcon />;
                    case 'delete': return <StyledDeleteIcon />;
                    default : return <button>{action.label}</button>;
                   }
                  }
                  return action.icon;
                 })
                }
                {/* { props.onEdit ? <StyledEditIcon /> : null}
                { props.onDelete ? <StyledDeleteIcon /> : null} */}
               </TdFixed>
              </>:null
             }
          </tr>
         )  //.map
         :null
  }

  /**
   * Modify Fixed Column / Action Column. 
   */
  const modifyActionColumn = ()=>{
   let tdFixed = document.getElementsByClassName("TdFixed");
   
   if(tdFixed.length > 0){
    //set the dummy cells to the computed value of the fixed column width;
    let computedWidthOfTdElement = window.getComputedStyle(tdFixed[0]).width;
    
    for(let dTd of document.getElementsByClassName("DummyTd")){
     dTd.style.minWidth = computedWidthOfTdElement;
    }
    //set the height of fixedTd
    let computedHeightofTdElement = window.getComputedStyle(tdFixed[0]).height;
    for(let fTd of document.getElementsByClassName("TdFixed")){
     fTd.style.height = computedHeightofTdElement;
    }
   }
  
  }

  useEffect(()=>{
   modifyActionColumn();
   initOnReadActionHandler();
   setEntities(props.entities);
  });
  
  return(
   entities && entities.length > 0 ?
   <ComponentContainer>
   {props.title ? props.title :null}
   <div style={{textAlign:"right",margin:"1em"}}>
     <TextField 
      label="Search" onChange={onChangeHandler}
      InputProps={
       {
        endAdornment:(
         <InputAdornment position="end" >
          <IconButton>
           <SvgIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">>
            {/* //from https://www.materialui.co/icon/search */}
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>			
           </SvgIcon>
          </IconButton>
         </InputAdornment>
        )
       }}
      />
    </div>
    <TableContainer>
      <TableWrapper >
       <Table>
       {renderHeaders()}
        <tbody>
         {
          renderRows()
         }
        </tbody>
       </Table>
      </TableWrapper>
    </TableContainer>
   </ComponentContainer>
   : null
  )
}

EBrowser.propTypes = {
 /** The entities to tabulate. Can be a Promise (that resolves to an array of entities), or array of entities */
 entities: PropTypes.oneOfType([
  PropTypes.instanceOf(Promise),
  PropTypes.array
 ]),
 /*
  * Uses the UISchema's properties index as bases in arranging the columns. Uses labels as column labels, these
  * are the only required properties.
  */
 UISchema: PropTypes.object,
 /**
  * The onRead handler function.
  * 
  * @prop {function} onRead - Triggered when a row is clicked.
  * @param {Object} entity
  */
 onRead: PropTypes.func,
 /**
  * Triggered when the edit action button is clicked.
  * @prop {function} [onEdit] - EBrowser will pass the entity to edit.
  * @param {Object} entity
  */
 onEdit: PropTypes.func,

 /**
  * Triggered when the delete action button is clicked.
  * @prop {function} [onDelete] - EBrowser will pass the entity to delete.
  * @param {Object} entity 
  */
 onDelete: PropTypes.func,

  /**
  * The title of the entity browser table.
  */
 title: PropTypes.string,
  /**
  * The title of the entity browser table.
  */
 searchLookUpFields: PropTypes.array,

 actions: PropTypes.array
}

export default EBrowser;