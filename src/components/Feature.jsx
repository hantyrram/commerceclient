import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled.div`
 min-height: 100%;
 min-width:100%;
 height:inherit;
 background-color: white;
`

const Header = Styled.div`
   height: 3em;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding: 0 .5em 0 .5em;
   background-color: #7f4abe;
   color: #f2ebeb;
`
const Content = Styled.div`
  padding: 1em;
`
const FeatureShortcuts = Styled.div`

`

/**
 * A Feature wrapper.
 */
export default (props)=>{
   console.log(props.featureShortcuts);
   return (
      <Wrapper>
         <Header>
            {props.group} {props.feature ? `/ ${props.feature}` : null}
            <FeatureShortcuts>{props.featureShortcuts ? props.featureShortcuts.map(FS=>FS):null}</FeatureShortcuts>
         </Header>
         <Content>
         {props.children}
         </Content>
      </Wrapper>
   )
}