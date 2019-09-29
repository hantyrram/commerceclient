import React from 'react';
import PropTypes from 'prop-types';

const ActiveTable = (props)=>{

   if(!props.data || props.data.length === 0){
      return <div><i>{'< Empty >'} </i></div>
   }

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
            <tr key={i}>
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

   return(
      <table>
         <thead><tr>{renderColumnHeaders()}</tr></thead>
         <tbody>{renderRows()}</tbody>
      </table>
   )
}


ActiveTable.propTypes = {
   onRowClick: PropTypes.func, //function called if row is clicked
   onRowSelect: PropTypes.func, // function called if row is selected, optional
   rowActionHandlers: PropTypes.array, // optional array of functions that accept the rowData, must return a Component e.g. button
   data: PropTypes.array, //array of objects
   columnHeaders: PropTypes.array, //array of string, which will be used as column headers
   hidden: PropTypes.array // array of string which is the property of the data to hide, e.g. _id if you don't want to show id
}

export default ActiveTable;