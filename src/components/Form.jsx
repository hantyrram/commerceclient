import React from 'react';
import Button from '@material-ui/core/Button';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {makeStyles} from '@material-ui/core/styles';
import './Form.css';

const useFormCloseBtnStyle = makeStyles({
   root: {
      fontWeight:"unset",
      lineHeight:"unset",
      textTransform:"unset",
      "&hover": {
         hover: {
            fontWeight: 600
         }
      }
   },
   outlined: {
      border:"none"
   //  borderBottom: "none",
   //  borderColor:"var(--border-and-line-color)"

   }
 });

function Form({onSubmit,title,closeable,onClose,children}){
   const classes = useFormCloseBtnStyle();
   return (
      <form action="" className="grid-form" onSubmit={onSubmit}>
         <div className="form-header">
            <span className="form-title">{title}</span>
            {
               closeable ? 
                  <Button 
                     startIcon={<CloseOutlinedIcon fontSize="small" color="secondary"/>} 
                        variant="outlined"
                           onClick={onClose}
                              classes={classes}
                           >
                     close
                  </Button>
               :null
            }
         </div>
         { children }
      </form>
   )
}

export default Form;