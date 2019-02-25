import ArtifactEmitter from "../ArtifactEmitter";

class Entity extends ArtifactEmitter{
 constructor(object){
  super();
  if(typeof object !== 'object') throw new Error(`@Entity : ${object} is not of type object `);
  Object.assign(this,object);
 }

 async save(){
  let artifact;
  if(!this._id){
   try {
     artifact = await this.constructor.save(this); 
     if(artifact.status === 'ok'){
      Object.assign(this,artifact.data.entity);
      this.emit(artifact);
      return this._id;
     }
      this.emit(artifact);
      return false;
   } catch (error) {
      console.log(error);
     this.emit(artifact);
     return false;
   }
  }

  try {
    artifact = await this.constructor.update(this);  
    if(artifact.status === 'ok'){
      Object.assign(this,artifact.data.entity);
      this.emit(artifact);
      return true;
    }
    this.emit(artifact);
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
  
 }

 async delete(){
  let artifact;
  try {
   artifact = await this.constructor.delete(this);
   if(artifact.status === 'ok'){
     Object.getOwnPropertyNames(this).forEach(p=>{
       delete this[p];
     });
     return true;
   }
   this.emit(artifact);
   return false;
  } catch (error) {
   console.log(error);
  }
  
 }

 get API_VERSION(){
  return 'apiv1';
 }

}

export default Entity;




