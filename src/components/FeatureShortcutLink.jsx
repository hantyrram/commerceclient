import React from 'react';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';

const StyledLink = Styled(Link)`
   text-decoration: none;
   color: inherit;
   border: 1px solid white;
   padding: .3em;
`
export default (props) => <StyledLink {...props} />