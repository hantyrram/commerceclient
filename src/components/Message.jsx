import React from 'react';

export default (props)=>{
  let style = {display:"block",border:"1px dotted white",padding:".5em",marginBottom:".5em"};

  let color = '#057296';
  let backgroundColor = '#a6e9e';
  
  if(props.type === 'error'){
   backgroundColor = '#f8aaa4';
   color = '#960f05';

  }

  if(props.type === 'success'){
   backgroundColor = '#77e377';
   color = "#0b4b0b";
  }

  style = Object.assign(style,{color:color,backgroundColor:backgroundColor});

  return (
   props.text ? <div style={style}>{props.text}</div> : null
  )
  
}

