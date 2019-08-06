import React, { Component , useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';

export default function Modal(props){
   const [open,setOpen] = useState(false);
   
   const onCloseHandler = (e)=>{
      setOpen(false);
   }

   const trigger = (e)=>{
      setOpen(true);
   }

   const exit = ()=>{
      setOpen(false);
   }

   useEffect(()=>{
      props.onFinished(exit);
   })
   
   return(
      <React.Fragment>
         <Button size="small" variant="outlined" onClick={trigger} >{props.triggerLabel}</Button> 
         <Dialog open={open} onClose={onCloseHandler}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
               {props.children}
            </DialogContent>
            <DialogActions>
               {props.actions(exit).map(a=>a)}
            </DialogActions>
         </Dialog>
      </React.Fragment>
   )
}

Modal.propTypes = {
   /**
    * The label of the modal trigger button.
    */
   triggerLabel: PropTypes.string,
   
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
    * A function that returns an Array of actions, actions can be Buttons, links.
    * The function receives a callback "closer" which can be called to close the Modal.
    * @param {function} closer The closer function of the Modal.
    * @return {Array}
    */
   adderModalActions: PropTypes.func,
}
