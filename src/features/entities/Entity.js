class Entity{
 constructor(object){
  if(typeof object !== 'object') throw new Error(`@Entity : ${object} is not of type object `);
  Object.assign(this,object);
 }

 async save(){
  if(!this._id){
   try {
     let res = await this.constructor.update(this); 
     return new this.constructor(res.data.data.entity);
   } catch (error) {
     console.log(error);
     emit('entity-action',{type:"error",text:"Error on Save"});
   }
  }
  return await this.constructor.save(this);
 }

 async remove(){
  try {
   return await this.constructor.delete(this);
  } catch (error) {
   console.log(error);
   emit('entity-action',{type:"error",text:"Error on Save"});
  }
  
 }

 get API_VERSION(){
  return 'apiv1';
 }

}

export default Entity;




