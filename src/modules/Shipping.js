/**
 * Shipping Methods
 */

export class ShippingClass{
   constructor(title,slug){
      this.t = title;
      this.s = slug;
   }

   set title(t){
      this.t = t;      
   }

   get title(){
      return this.t;
   }
}

class ShippingMethod{
   constructor(title,cost = 0, shippingClasses){
      this.t = title;
      this.c = cost;
      this.sc = shippingClasses;
   }
   
   set cost(c){
      this.c = c;
   }

   set title(t){
      this.t = t;
   }

   get cost(){
      return this.c;
   }

   get title(){
      return this.t;
   }
}

export class FlatRateShipping extends ShippingMethod{
   constructor(){
      super('Flat Rate Shipping');
   }
}

export class FreeShipping extends ShippingMethod{
   constructor(){
      super('Free Shipping');
   }
}

export class LocalPickUp extends ShippingMethod{
   constructor(){
      super('Local Pick Up');
   }
}



//add shipping zone
   //set name
   //set region (country)
   //provide extra feature for philippines

//add shipping methods
   //set name
   //cost

//add shipping classes
//set shipping origin
//add shipping methods to shipping zone



