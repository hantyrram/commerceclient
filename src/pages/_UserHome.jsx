import React, { Component } from 'react';
import styled from 'styled-components';

const Section = styled.div`
 border: 1px solid grey,
`;

const Page = styled.div`
 background-color: #f6f9fc;
 width: 95vw;
 height: 95vh;
 margin:auto;
`;

const Header = styled(Section)`
  min-height: 10%;
  height: 10%;
`;

const Mid = styled(Section)`
 min-height: 80%;
 height:80%;
 text-align:center;
`;

const Footer = styled(Section)``;

const FeatureNav = styled.div`
 min-width: 25%;
 width: 25%;
 border: 1px dashed red;
 margin:0;
 display:inline-block;
 text-align:left;
`;

const FeatureContent = styled.div`
 display: inline-block;
 min-width: 68%;
 border:1px dashed green;
 text-align: left;
`;

export default (props)=>{

 return(
  <Page>
    <Header>My Header</Header>
    <Mid>
    <FeatureNav>Navigation Section</FeatureNav>
    <FeatureContent>Content Section</FeatureContent>
    </Mid>
    <Footer>My Footer</Footer>
  </Page>
 ) 
}