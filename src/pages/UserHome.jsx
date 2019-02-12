import React, { Component } from 'react';
import {Switch,Route,Link} from 'react-router-dom';
import Permission from '../features/PermissionBrowse';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import style from 'styled-components';


const styles = {
  
  display:"flex",
  flexDirection: "column",
  justifyContent:"flex-start",
  height:"100vh",
  backgroundColor:"rgb(231, 235, 242)",
  backgroundImage: "linear-gradient(to bottom right, #E9ECF1, #e9ecf0)" 
  
}

const mainSectionStyles = {
  display:"flex",
  flexDirection: "row",
  justifyContent:"flex-start",
  minHeight:"87%"
}

const SideNavDiv = style.div`
 min-width: 20%;
`

const Content = style.div`
 min-width: 78%;
 max-width: 78%;
 padding-top: 5px;
 scroll:auto;
`
export default (props)=>{
  return(
    <div id="page-userhome" className="page" style={styles}>
      <Header {...props}/>
      <div id="main-section" style={mainSectionStyles}>
        <SideNavDiv id="nav" >
          <SideNav features={props.user.permittedFeatures}/>
        </SideNavDiv>
        <Content id="content">
          
          <Switch>
           {
            props.user.permittedFeatures && props.user.permittedFeatures.length > 0 ? props.user.permittedFeatures.reduce((acc,Feature)=>{
             //routable feature / feature with path
             if(Feature.path){
              acc.push(Feature);
             }
             return acc;
            },[]).map(Feature=><Route exact path={Feature.path} render={(renderProps)=><Feature {...renderProps} {...props}/>}/>) : null 
           }
          </Switch>
        </Content>
      </div>
    </div>
  );
}