/**
 * Connects a component 
 */



/**
 * A function that takes in the state, and returns an object with keys used as prop key of a component.
 * @typedef {function} mapStateToProps
 * 
 */
import React from 'react';
import useAppState from './useAppState';

export default (mapStateToProps)=>{
   let { getAppState } = useAppState();
   return function(ConnectedComponent){
      return <ConnectedComponent {...mapStateToProps(getAppState())}/>
   }
}