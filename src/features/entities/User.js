import axios from './axios';
import Entity from './Entity';
import apis from '../../apis';

/**
 * @extends Entity
 */
class User extends Entity{

 authenticate(){}
 /**
  * Logs in the user.
  * @async
  * @throws Invalid Username Or Password.
  */
 async login(){
  if(!this.username || !this.password){
   throw new Error("Invalid Username Or Password");
  }
  let response = await axios.post(apis['login'],this);
  let artifact = response.data;
  this._id = artifact.entity._id;
  delete this['password'];
  this.emit('login',artifact);
  return response.data.data;
 }
  
  /**
  * Logs out the user.
  * @async
  * @throws Invalid Username Or Password.
  */
 async logout(){}

}

export default User;