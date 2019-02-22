import React, { Component } from 'react';

class Deleter extends Component{

  

  componentDidMount(){
    let _self = this;
    document.getElementById("bread-deleter").addEventListener('click',function(e){
      if(e.eventPhase === Event.CAPTURING_PHASE && e.target.id === e.currentTarget.id){
        (async function(){
          try {
            let deleted = await _self.props.entity.delete();//delete MUST result truthy /falsy values for this to work.
            if(deleted){
              _self.props.deleteResult(deleted,_self.props.entity);
            }else{
              _self.props.deleteResult(!deleted,_self.props.entity);
            }
          } catch (error) {
           console.log(error); 
          }
        })()
      }
    },true);
  }

  render(){
    return(
      <div id="bread-deleter"></div>
    )
  }
}

export default Deleter;