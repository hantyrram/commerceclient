import React, { useState, useEffect, useReducer,useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function ModalAdder(props){
   const [open,setOpen] = useState(false);
   const Content = props.content;
   const onCloseHandler = (e)=>{
      setOpen(false);
   }

   const trigger = (e)=>{
      setOpen(true);
   }

   const cancelAdd = props.actions.filter(action=> action.type === 'cancelAdd')[0].ui;
   const confirmAdd = props.actions.filter(action=> action.type === 'confirmAdd')[0].ui;

   const cancelClickHandler= (e)=>{
      setOpen(false);
   }
   const confirmClickHandler= (e)=>{
      props.confirmAdd();
      setOpen(false);
   }
   
   
   return(
      <React.Fragment>
         <Button size="small" style={{borderRadius:"50%",color:"green"}} onClick={trigger} ><AddIcon /></Button> 
         <Dialog open={open} onClose={onCloseHandler}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
               <Content />
            </DialogContent>
            <DialogActions>
               <button onClick={cancelClickHandler}> {cancelAdd} </button>
               <button onClick={confirmClickHandler}> {confirmAdd}</button>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   )
}

ModalAdder.propTypes = {
   /**
    * The Title of the Adder Modal.
    */
   title: PropTypes.string,
    /**
    * Content of the modal, e.g. an EForm.
    */
   content: PropTypes.object,
   /**
    * Invoked when the user clicks the cancel button.
    */
   cancel: PropTypes.func,
   /**
    * Invoked when the user clicks on the confirm button.
    */
   confirm: PropTypes.func,
    /**
    * The adder modal actions {type:'cancelAdd,ui}, {type:'confirmAdd',ui}.
    * With ui = A string that will be used as the label of the buttons.
    */
   actions: PropTypes.array,
}

export default ModalAdder;