import React, { Component } from 'react';
import {Switch,Route,Link} from 'react-router-dom';
import Permission from '../features/PermissionBrowse';
import Header from '../comps/Header';
import SideNav from '../components/SideNav';
import style from 'styled-components';
import Message from '../components/Message';
import { subscribe } from '../actionEvent';


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
 scroll:auto;
 background-color:white;
`
class UserHome extends Component{
 constructor(props){
  super(props);
  this.state = {}
  this.actionEventListener = this.actionEventListener.bind(this);
  this.unsubscribeToActionEvent = subscribe(this.actionEventListener);
 }


 actionEventListener(actionName,artifact){
  console.log(`Artifact Received`,artifact);
  if(artifact && artifact.message){
   this.setState({message:artifact.message});
  }else{
   this.setState({message:null});
  }
 }

 componentWillUnmount(){
  this.unsubscribeToActionEvent();
 }

 render(){
  return(
   <div id="page-userhome" className="page" style={styles}>
     <Header {... this.props}/>
     <div id="main-section" style={mainSectionStyles}>
       <SideNavDiv id="nav" >
         <SideNav features={this.props.user.permittedFeatures}/>
       </SideNavDiv>
       <Content id="content" >
         {this.state.message && this.state.message !== null ? <Message type={this.state.message.type} text={this.state.message.text} />: null}
         <Switch>
          {
           this.props.user.permittedFeatures && this.props.user.permittedFeatures.length > 0 ? this.props.user.permittedFeatures.reduce((acc,Feature)=>{
            //routable feature / feature with path
            if(Feature.path){
             acc.push(Feature);
            }
            return acc;
           },[]).map(Feature=><Route path={Feature.path} render={(renderProps)=><Feature {... renderProps} {... this.props} onMessage = {this.onMessage}/>}/>) : null 
          }
          </Switch>
        </Content>
      </div>
    </div>
  );
 }
  
}

export default UserHome;