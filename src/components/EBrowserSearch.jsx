import React, { useState, useEffect, useReducer,useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
/**
 * A Search component for the EBrowser.
 * 
 * @author Ronaldo Ramano <rongrammer@hotmail.com>
 * @version 0.0.1
 */
export default function EBrowserSearch({searchableFields,data,onResult}){
   const onChange = (e)=>{
      let searchStr = e.target.value;
      (async ()=>{
       let filtered = data.filter((entity)=>{
        let truthAccumulator;
        if(searchableFields && searchableFields.length > 0){
         for(let field of searchableFields){//search on the searchlookUpFields
          truthAccumulator |= RegExp(`${searchStr}`,'i').test(entity[field]);
         }
        }else{
         for(let field of Object.keys(entity)){//search all prop by default
          truthAccumulator |= RegExp(`${searchStr}`,'i').test(entity[field]);
         }
        }
        
        return truthAccumulator;
       });
      onResult(filtered);
      })();
   }

   return(
   <div style={{textAlign:"left",marginBottom:"1em"}}>
     <TextField 
      onChange={onChange}
      label="Search" 
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
   )
}