import React from 'react';
import styled from 'styled-components';


/**
 * @namespace styled
 * @description This can be used as the main wrapper of each exported component.
 */
export const ComponentContainer = styled.div`
 margin: .2em;
 border: ${boxed => boxed ? '1px solid #dcd5d5': 'none'}
`;

