import React, { useState, useEffect, useReducer,useRef} from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/DeleteSharp';

const TableContainer = styled.div`
 font-family: 'Roboto Slab',sans-serif;
 border: 1px solid black;
 min-width:100%;
 width: 100%;
 overflow: hidden;
 position:relative;
 text-align:center;
`;

const TableWrapper = styled.div`
 min-width:100%;
 border:1px dashed red;
 overflow-x:auto;
`;

const Table = styled.table`
 border-collapse: collapse;
 min-width:100%;
 margin-bottom: .5em;
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
 border-top: 1px solid grey;
`;

//border-box,because the DummyTd width depends on the computed style of Fixed
const ThFixed = styled(Th)`
 position:absolute;
 right: 0px;
 min-width:8%;
 background-color:white;
 box-sizing:border-box; 
 
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
 color:#ec5141eb;
 
`;


export default (props)=>{

 let [entities,setEntities] = useState(props.entities);
 let [filteredEntities,setFilteredEntities] = useState([]);
 
 
 useEffect(()=>{
  let tdFixed = document.getElementsByClassName("TdFixed");
 //set the dummy cells to the computed value of the fixed column width;
  let computedWidthOfTdElement = window.getComputedStyle(tdFixed[0]).width;
  
  for(let dTd of document.getElementsByClassName("DummyTd")){
   dTd.style.minWidth = computedWidthOfTdElement;
  }
  //set the height of fixedTd
  let computedHeightofTdElement = window.getComputedStyle(tdFixed[0]).height;
  for(let fTd of document.getElementsByClassName("TdFixed")){
   fTd.style.height = computedHeightofTdElement;
   console.log(fTd);
  }


  setEntities(props.entities);
 },[props.entities]);

 function onChangeHandler(e){
  let searchStr = e.target.value;
  //search name
  (async ()=>{
   let filtered = entities.filter((e)=>
    RegExp(`${searchStr}`,'i').test(e.name) || RegExp(`${searchStr}`,'i').test(e.description) );
    setFilteredEntities(filtered); 
  })();
 }


 let columns = [
  "Column1",
  'Column2',
  'Column3',
  'Column4',
  'Column5',
  'Column6',
  'Column7',
  'Column8',
  'Column9',
  'Column10',
  'Column11',
  'Column12',
  'Column13',
  'Column14',
  'Column15',
  'Column12',
  'Column13',
  'Column14',
  'Column15',
 ];

 let cells = [
  "Column1",
  'Column2',
  'Column3',
  'Column4',
  'Column5',
  'Column6',
  'Column7',
  'Column8',
  'Column9',
  'Column10',
  'Column11',
  'Column12',
  'Column13',
  'Column14',
  'Column15',
  'Column12',
  'Column13',
  'Column14',
  'Column15',
 ]

 return(
  <div>
   <div><input type="text" onChange={onChangeHandler}/></div>
   <div>{filteredEntities.length > 0? JSON.stringify(filteredEntities): JSON.stringify(entities)}</div>
   <TableContainer>
     <TableWrapper >
      <Table>
       <thead>
        {
         columns.map(col=> <Th>{col}</Th>)
        }
        <ThFixed className="ThFixed">Action</ThFixed>
        
       </thead>
       <tbody>
        <tr>
         {cells.map(cell => <Td>{cell}</Td>)}
         <DummyTd className="DummyTd" /> 
         <TdFixed className="TdFixed"><StyledDeleteIcon /></TdFixed>
        </tr>
        <tr>
         {cells.map(cell => <Td>{cell}</Td>)}
         <DummyTd className="DummyTd" />
         <TdFixed className="TdFixed"><StyledDeleteIcon /></TdFixed>
        </tr>
        
       </tbody>
      </Table>
     </TableWrapper>
   </TableContainer>
  </div>
 )
}