import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../UserContext';
import { makeStyles } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Section = styled.div`
 border: 1px solid grey,
`;

const Page = styled.div`
 background-color: #f6f9fc;
 width: 95vw;
 height: 95vh;
`;

const Header = styled(Section)`
  min-height: 10%;
  height: 10%;
`;

const Mid = styled(Section)`
 min-height: 80%;
 height:80%;
`;

const Footer = styled(Section)``;

const FeatureNav = styled.div`
 min-width: 25%;
 width: 25%;
 border: 1px dashed red;
 display:inline-block;
 text-align:left;
`;

const FeatureContent = styled.div`
 min-width: 70%;
 display:inline-block;
 border:1px dashed green;
 text-align: left;
 vertical-align: top;
`;

const Ul = styled.ul`
   text-decoration: none;
   list-style-type: none;
`


export default (props)=>{
 
 const user = useContext(UserContext);  

 
 return(
  <Page>
    <Header>My Header</Header>
    <Mid>
      <FeatureNav>
         <Ul>
           Catalog
           <li><Link to="/products">Products</Link></li>
           <li><Link to="/categories">Product Categories</Link></li>
        </Ul> 
        <Ul>
           Credential Management
           <li><Link to="/credentials">Credentials</Link></li>
           <li><Link to="/roles">Roles</Link></li>
           <li><Link to="/Permissions">Permissions</Link></li>
        </Ul>
      </FeatureNav>
      <FeatureContent>Hello Iam the content</FeatureContent>
    </Mid>
    <Footer>My Footer</Footer>
  </Page>
 ) 
}