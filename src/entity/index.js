import axios from 'axios';
import apis from './apis';
import Permission from './Permission';

/**
 *@namespace Static
 */

/**
 * A static function attached to an Entity derived class which provides browsing functionality of the BREAD construct.
 * This function must be bounded with an Entity derived class, that this function will be used on. This function 
 * searches for the browse path on the apis using the convention <entity.name>_browse e.g. user_browse where user 
 * is the lowercased name of the derived Entity. It also looks for the static property "browsePath" if the path
 * isn't found on the apis.
 * @memberof Static
 * @static 
 * @this - The Entity subclass.
 * @param {number} [limit] - The number of record to fetch, this will be added as a url query.
 * @return {Artifact | null} - The artifact of this action, or null on failure. 
 */
async function browse(){
 
 let path = this.browsePath || apis(this.name.toLowerCase() + '_browse');
 
 try {
  let response = await axios.get(path);
  let artifact = response.data.data;
  let entities = artifact.entity;
  let _self = this;
  return entities.map(e => new _self.constructor(e));
 } catch (error) {
  console.log(error);
  return null;
 }
}

Permission.browse = browse.bind(Permission);

export default {
 Permission,
}