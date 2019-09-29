import React, { useContext,useEffect } from 'react';
import styled from 'styled-components';
const Table = styled.table`
 border-collapse: collapse;
 border: 1px solid #d6cccc;
 min-widTh:100%;
 // margin-bottom: .5em;
 & tr {
  border-top: 1px solid #d6cccc;
  text-align:left;  
  color:#696060;
 }
 & tbody tr:hover{
  background-color:#f3ffee;
  color:#37423d;
 }
`;

const Th = styled.th`
 white-space:nowrap;
 padding: .5em;
 text-align:left;
`;

const Title = styled.div`
   border-bottom: 1px solid #e4e3e3;
   font-size: 1.5em;
   font-weight: bold;
   font-style: italic;
   color: #bd9696;
   padding-bottom: .5em;
   margin-bottom: 1em;
`
export default (props)=>{
   return(
      <div>
         <Title>{props.title}</Title>
         <Table>
            <thead>
               <Th>Resource</Th>
               <Th>Permissions</Th>
            </thead>
            <tbody>
               {
                  (props.data || []).map(permission=>{
                     let resource  = Object.getOwnPropertyNames(permission)[0];
                     let actions = Object.getOwnPropertyNames(permission[resource]);
                     let row = <tr>
                        <td>{resource}</td>
                        <td>{actions.map(action=> `${action} ,`.replace(/(,)$/,''))}</td>
                     </tr>

                     return row;
                  })
               }
            </tbody>
         </Table>
      </div>
   )
   
}


