import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import Button from '@material-ui/core/Button';
const useTableRowStyles = makeStyles({
   hover: {
      '&:hover': {
        backgroundColor: '#bedbd0 !important',
      }
    }
});

const useActionColumnStyles = makeStyles({
   hover: {
      '&:hover': {
        backgroundColor: 'unset !important',
      }
    }
});

const ActiveTable = (props)=>{

   let tableRef = useRef(null);
   let checkboxRef = useRef(null);
   const tableRowClasses = useTableRowStyles();
   const actionColumnClasses = useActionColumnStyles();
   

   const renderColumnHeaders = ()=>{
      if(props.columnHeaders){
         return  props.columnHeaders.map((hObj,i)=>{
            let key = Object.keys(hObj)[0];
            return(
               <TableCell component="th" key={i}>{ hObj[key] } </TableCell>
            )
         })
      }

      //use data object's property names
      // let sampleData = props.data[0];

      // return  Object.getOwnPropertyNames(sampleData).map(pName=>{
      //    return <TableCell component="th">{pName}</TableCell>
      // })
   }

   //renders the select / checkbox if onRowSelect is enabled
   //param dObj - the object 
   const renderSelect = (dObj)=>{
      if(!props.onRowSelect){
         return null;
      }

      const checkboxChangeHandler = (e)=>{
         props.onRowSelect({selected: e.target.checked, rowdata: dObj});
      }
      
      return (
         <TableCell >
            <input type="checkbox" onChange={checkboxChangeHandler}/>
         </TableCell>
      )

   }

   // function deleteHandler(rowdata,e){
   //    console.dir(e.target);
   //    console.dir(e.currentTarget);
   //    if(e.currentTarget.id === "activetable-delete-btn"){
   //       console.log('Stopping Propagation');
   //       e.stopPropagation();
   //    }
   //    // props.onRowDelete(rowdata);
   // }

   function rowDeleteHandler(rowdata){
      return e => {
         if(e.target.id === "activetable-delete-btn"){
            console.log('Stopping Propagation');
            e.cancelBubble = true;
         }
         props.onRowDelete(rowdata);
      }
   }

   function renderRows(){
      return props.data.map((dObj,i)=>{
         return (
            <TableRow  key={i} rowdata={JSON.stringify(dObj)} classes={{ ...tableRowClasses }} hover>
               {
                  renderSelect(dObj)
               }
               {
                  props.columnHeaders.map((hObj,ii)=>{
                     let pName = Object.keys(hObj)[0];
                     let tdValue = String(dObj[pName]); ///??? convert all to string temporarily, because array value would result an error
                     return (
                        <TableCell key={ii} style={{display: (props.hidden || []).includes(hObj)?'none':'', cursor: 'default'}} >
                           { tdValue }
                        </TableCell>
                     )
                  })
               }
               {
                  props.onRowDelete ? 
                     <TableCell> 
                        <Button 
                           startIcon={<DeleteIcon color="secondary"/>}
                           size="small"
                           id="activetable-delete-btn" type="button" onClick={rowDeleteHandler(dObj)}>
                           Delete
                        </Button>
                     </TableCell>
                  : null
               }
            </TableRow>
         )
      });
   }

   /**
    * Listen to <tr> click event if onRowClick prop is provided.
    */
   useEffect(function addRowClickListener(){
      if(props.onRowClick && props.data && props.data.length > 0){
         let tbody = tableRef.current.children[1];         
         
         for(let tr of tbody.children){
            tr.style.cursor = 'default'; 
            // NOTE: tr.addEventListener causes multiple onRowClick invokations, 
            tr.onclick = function(e){
               console.dir(e.target.tagName === "TD");
               // action buttons e.g. onRowDelete handler have different event handler, 
               //only trigger onRowClick on TD target
               if(e.target.tagName === "TD"){ 
                  if(props.onRowClick){
                     props.onRowClick(JSON.parse(tr.attributes.rowdata.value));
                  }
               }
               
            }
         }
      }
   },[props.onRowClick,props.data]);

   // useEffect(addCheckboxChangeListener,[props.onRowSelect]);

   if(!props.data || props.data.length === 0){
      if(!props.showHeadersOnNoData){
         return(
            <div className="active-table" style={{maxWidth:"100%",textAlign:"center"}}>
               { props.noDataCaption || '< No Data >'}
            </div>
         )
      }
      return(
         <div className="active-table" style={{maxWidth:"100%"}}>
         <Table ref={tableRef} size="small">
            <TableHead><tr>{renderColumnHeaders()}</tr></TableHead>
            <TableBody>
               <tr><td colspan={3} style={{textAlign:"center"}}> {props.noDataCaption || '< No Data >'}</td></tr>
            </TableBody>
         </Table>
         </div>
      )
      
   }
   
   return(
      <div className="active-table" style={{width:"100%",maxWidth:"100%"}}>
         <Table ref={tableRef} size="small">
            <TableHead><tr>{renderColumnHeaders()}</tr></TableHead>
            <TableBody>{renderRows()}</TableBody>
         </Table>
      </div>
      
   )
}


ActiveTable.propTypes = {
   /**
    * Function called when row is clicked. Function is passed with the entity on the clicked row.
    * @param {object} rowdata The data of the current row, including hidden data.
    */
   onRowClick: PropTypes.func, 
   onRowSelect: PropTypes.func, // function called if row is selected, optional
   rowHoverColor: PropTypes.string, // color of the row on mouse hover
   rowActionHandlers: PropTypes.array, // optional array of functions that accept the rowdata, must return a Component e.g. button
   data: PropTypes.array, //array of objects
   //array of Objects 
   //each object key maps to the property of the datas object, the value will be the column header.
   //e.g. {firstname: 'First Name'} where firstname is a key of data[i]
   columnHeaders: PropTypes.array, 
   hidden: PropTypes.array, // array of string which is the property of the data to hide, e.g. _id if you don't want to show id
   onRowDelete: PropTypes.func, // a function that will be called when the delete button is clicked,
   showHeadersOnNoData: PropTypes.bool, // Show the table header even on empty data
   /**
    * The text shown when there is no data, default = < No Data >
    * 
    */
   noDataCaption: PropTypes.string
}


export default ActiveTable;