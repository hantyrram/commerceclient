import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ActiveTable = (props)=>{

   let tableRef = useRef(null);
   let checkboxRef = useRef(null);
   

   const renderColumnHeaders = ()=>{
      if(props.columnHeaders){
         return  props.columnHeaders.map((hObj,i)=>{
            let key = Object.keys(hObj)[0];
            return(
               <th key={i}>{ hObj[key] } </th>
            )
         })
      }

      //use data object's property names
      let sampleData = props.data[0];

      return  Object.getOwnPropertyNames(sampleData).map(pName=>{
         return <th>{pName}</th>
      })
   }

   //renders the select / checkbox if onRowSelect is enabled
   //param dObj - the object 
   const renderSelect = (dObj)=>{
      if(!props.onRowSelect){
         return null;
      }

      const checkboxChangeHandler = (e)=>{
         props.onRowSelect({selected: e.target.checked, rowData: dObj});
      }
      
      return (
         <td >
            <input type="checkbox" onChange={checkboxChangeHandler}/>
         </td>
      )

   }

   function deleteHandler(rowData,e){
      props.onRowDelete(rowData);
      
   }

   function renderRows(){
      return props.data.map((dObj,i)=>{
         return (
            <tr key={i} rowData={JSON.stringify(dObj)}>
               {
                  renderSelect(dObj)
               }
               {
                  props.columnHeaders.map((hObj,ii)=>{
                     let pName = Object.keys(hObj)[0];
                     let tdValue = String(dObj[pName]); ///??? convert all to string temporarily, because array value would result an error
                     return (
                        <td key={ii} style={{display: (props.hidden || []).includes(hObj)?'none':'', cursor: 'inherit'}} >
                           { tdValue }
                        </td>
                     )
                  })
               }
               {
                  props.onRowDelete ? <td><button onClick={deleteHandler.bind({},dObj)}>Delete</button></td>: null
               }
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
            console.log(tr);
            tr.style.cursor = 'default';            
            tr.addEventListener('click',function(){
               if(props.onRowClick){
                  props.onRowClick(JSON.parse(tr.attributes.rowData.value));
               }
            });
         }
      }
   }

   useEffect(addRowClickListener,[props.onRowClick,props.data]);
   // useEffect(addCheckboxChangeListener,[props.onRowSelect]);

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
   //array of Objects 
   //each object key maps to the property of the datas object, the value will be the column header.
   //e.g. {firstname: 'First Name'} where firstname is a key of data[i]
   columnHeaders: PropTypes.array, 
   hidden: PropTypes.array, // array of string which is the property of the data to hide, e.g. _id if you don't want to show id
   onRowDelete: PropTypes.func // a function that will be called when the delete button is clicked
}


export default ActiveTable;