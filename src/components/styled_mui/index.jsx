import React from 'react'
import MuiButton from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

export const Button = (props)=>{
   // let color =
   // const useStyle = makeStyles({
   //    root: {
   //       color: props.primary? 
   //    }
   // });
   
   return(
      <MuiButton >{props.children}</MuiButton>
   )
}
