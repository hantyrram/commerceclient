import React, { Component } from 'react';

const style = {
 backgroundColor:"#ada2f1",
 fontSize:"medium",
 padding:".2em .2em .2em .5em",
 color:"white",
 minHeight:"2em",
}

export default _ => <div className="feature-title" style={style}>{_.children}</div>