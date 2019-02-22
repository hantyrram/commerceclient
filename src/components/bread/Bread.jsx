import React, { Component } from 'react';
import EntityBrowser from '../components/EntityBrowser';
import Card from '../components/styled_elements/Card';
import {Link,Route,Router} from 'react-router-dom';
import axios from 'axios';
import { isRegExp } from 'util';
import { Switch, withRouter } from 'react-router-dom';
/**
 * 
 */
class Bread extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      entities:{},
     }
  }

  /**
   * The entity to add
   * @param {*} entity 
   */
  onAdd(entity){
   (async ()=>{
    try {
     let response = await entity.save();
     if(response.status === 'ok'){
      let entities = Object.create(this.state.entities);
      entities.push(response.data.data.entity);
      this.setState({entities: entities});
     }
    } catch (error) {
      console.log(error);
    }
   })()
  }


  /**
   * The entity to delete,
   * @param {*} entity 
   */
  onDelete(entity){
   (async ()=>{
    try {
     let response = await entity.delete();
     if(response.status === 'ok'){
      let entities = Object.create(this.state.entities);
      let i = entities.findIndex(e => {
       return e._id === entity._id;
      });
      entities.splice(i,1);
      this.setState({entities: entities});
     }
    } catch (error) {
     
    }
   })()
  }

  /**
   * 
   * @param {*} filter - The filter to be added as queries to browser path
   */
  onBrowse(filter = {}){//browser is shown ,table is shown,by default it's shown
   (async ()=>{
    try {
     let response = await this.props.Entity.find(filter);
     let entities = response.data.data.entity.map(e=>{
      return new this.props.Entity.constructor(e);//instantiate
     });
     this.setState({entities: entities});
    } catch (error) {
     
    }
   })()
  }

  /**
   * 
   * @param {Entity} entity - the entity to edit.MUST have ._id
   */
  onEdit(entity){
   (async ()=>{
    try {
     let response = await entity.save();
     if(response.status === 'ok'){
      let entities = Object.create(this.state.entities);
      let i = entities.findIndex(e => {
       return e._id === entity._id;
      });
      entities.splice(i,1,entity);//replace
      this.setState({entities: entities});
     }
    } catch (error) {
      console.log(error);
    }
   })()
  }

  render() { 
    let Reader = this.props.Reader ? this.props.Reader : null;
    let Editor = this.props.Editor ? this.props.Editor : null;
    let Adder = this.props.Adder ? this.props.Adder : null;
    return ( 
      <React.Fragment>
        <Card>
          <Switch>
            {Reader?<Route  exact path={Reader.path} render={(props)=>{return <Reader {... props} editorPath={Editor && Editor.path? Editor.path:null} onDelete={this.onDelete}/> }} />:null}
            {Editor?<Route  exact path={Editor.path} render={(props)=>{return <Editor {... props}  onEdit={this.onEdit} /> }} /> :null}
            {Adder?<Route  exact path={Adder.path} render={(props)=>{return <Adder {... props}  onAdd={this.onAdd}/> }} />:null}
            <Route render={()=>{return <div>Page Not Found</div>}} />
          </Switch>
          {/* adder here */}
          <EntityBrowser view="browse" editorPath={Editor.path} readerPath={Reader.path} onDelete={this.onDelete} onBrowse={this.onBrowse} entities={this.state.entities}/>
        </Card>
      </React.Fragment>
      
     );
  }
}

export default Bread;