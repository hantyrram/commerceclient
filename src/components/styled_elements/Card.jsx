import styled from 'styled-components';

export default styled.div`
 display:${props=>props.display || 'block'};
 background-color:white;
 box-shadow: rgba(0, 0, 0, 0.2) -1px -1px 5px, rgba(0, 0, 0, 0.19) 1px 1px 5px;
`