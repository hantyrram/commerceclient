
import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function(props){
   const [expanded,setExpanded] = useState(false);

   const handleChange = panelId =>(e, isExpanded)=>{
      console.log(isExpanded);
      setExpanded(isExpanded ? panelId: false);
   }
   return(
      <ExpansionPanel expanded={expanded === props.fieldname} onChange={handleChange(props.fieldname)}>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>{props.fieldname}</ExpansionPanelSummary>
         <ExpansionPanelDetails>{props.children}</ExpansionPanelDetails>
      </ExpansionPanel>
   )
}