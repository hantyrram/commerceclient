import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ActiveTable = (props)=>{

   let tableRef = useRef(null);

   

   const renderColumnHeaders = ()=>{
      if(props.columnHeaders){
         return  props.columnHeaders.map((columnHeader,i)=>{
            return <th key={i}>{columnHeader}</th>
         })
      }

      //use data object's property names
      let sampleData = props.data[0];

      return  Object.getOwnPropertyNames(sampleData).map(pName=>{
         return <th>{pName}</th>
      })
   }

   function renderRows(){
      return props.data.map((obj,i)=>{
         return (
            <tr key={i} rowData={JSON.stringify(obj)}>
               {Object.getOwnPropertyNames(obj).map((pName,ii)=>{
                  let hidden = props.hidden || [];
                  return (
                     <td key={ii} style={{display: hidden.includes(pName)?'none':''}}>{obj[pName]}</td>
                  )
               })}
            </tr>
         )
      });
   }

   /**
    * Listen to <tr> click event if onRowClick prop is provided.
    */
   const addRowClickListener = ()=>{
      if(props.onRowClick){
         let tbody = tableRef.current.children[1];
         for(let tr of tbody.children){
            tr.style.cursor = 'default';
            tr.addEventListener('click',function(){
               if(props.onRowClick){
                  props.onRowClick(JSON.parse(tr.attributes.rowData.value));
               }
            });
         }
      }
   }

   useEffect(addRowClickListener,[]);

   if(!props.data || props.data.length === 0){
      return <div><i>{'< Empty >'} </i></div>
   }
   
   return(
      <table ref={tableRef}>
         <thead><tr>{renderColumnHeaders()}</tr></thead>
         <tbody>{renderRows()}</tbody>
      </table>
   )
}


ActiveTable.propTypes = {
   /**
    * Function called when row is clicked. Function is passed with the entity on the clicked row.
    * @param {object} rowData The data of the current row, including hidden data.
    */
   onRowClick: PropTypes.func, 
   onRowSelect: PropTypes.func, // function called if row is selected, optional
   rowActionHandlers: PropTypes.array, // optional array of functions that accept the rowData, must return a Component e.g. button
   data: PropTypes.array, //array of objects
   columnHeaders: PropTypes.array, //array of string, which will be used as column headers
   hidden: PropTypes.array // array of string which is the property of the data to hide, e.g. _id if you don't want to show id
}

export default ActiveTable;