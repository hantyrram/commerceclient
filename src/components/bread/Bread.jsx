import React, { Component } from 'react';
import EntityBrowser from '../components/EntityBrowser';
import Card from '../components/styled_elements/Card';
import {Link,Route,Router} from 'react-router-dom';
import axios from 'axios';
import { isRegExp } from 'util';
import { Switch, withRouter } from '../../node_modules/react-router-dom';
/**
 * 
 */
class Bread extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      permissions:null,
      currentAction:null,
      currentActionableEntity:null
     }
  }

  async componentDidMount(){
    let response = await this.props.Entity.find({});
    this.setState({entities:response.data.data.entities});
  }

  onDelete(entity){
   let _self = this;
   if(this.state.entities && Object.getOwnPropertyNames(this.state.entities).length > 0){
     (async ()=>{
       let deleteResponse = await entity.delete();
       if(deleteResponse.status === 'ok'){
        let indexOfDeletedEntity = this.state.entities.findIndex(e=>e._id === entity._id);
        if(indexOfDeletedEntity !== -1){
          let copy = Object.assign({},this.state.entities);
          copy.splice(indexOfDeletedEntity,1);
          _self.setState({entities: copy});
          return;
        }
       }
       _self.setState({entities:_self.state.entities});//or callback the EntityBrowser and say abort delete was unsuccessful,
     })()
   }
  }

  onAddResult(result,entity){//0 failed,1 success
    if(result === 1){
      this.setState({entities: [entity,...this.state.entities]});
    }
  }

  onEditResult(result,entity){
    if(result === 1){
      let i = this.state.entities.findIndex(e=>e._id === entity._id);
      if(i !== -1){
        let copy = [...this.state.entities];
        copy[i] = entity;
        this.setState({entities: copy});
      }
    }
  }

  onDeleteResult(result,entity){

  }

  render() { 
    let Reader = this.props.Reader ? this.props.Reader : null;
    let Editor = this.props.Editor ? this.props.Editor : null;
    let Adder = this.props.Adder ? this.props.Adder : null;
    return ( 
      <React.Fragment>
        <Card>
          <Switch>
            {Reader?<Route  exact path={Reader.path} render={(props)=>{return <Reader {... props} editorPath={Editor.path} onDeleteResult={this.onDelete.result(this)}/> }} />:null}
            {Editor?<Route  exact path={Editor.path} render={(props)=>{return <Editor {... props}  onEditResult={this.onEditResult.bind(this)} /> }} /> :null}
            {Adder?<Route  exact path={Adder.path} render={(props)=>{return <Adder {... props}  onAddResult={this.onAddResult.bind(this)}/> }} />:null}
            <Route render={()=>{return <div>Page Not Found</div>}} />
          </Switch>
          <EntityBrowser readerPath={Reader?Reader.path:null} editorPath={Editor?Editor.path:null} adderPath={Adder?Adder.path:null} deleter={this.props.Deleter}  entities={this.state.entities} />
        </Card>
      </React.Fragment>
      
     );
  }
}

export default Bread;