/**
 * Default Shipping Method Templates
 */

class ShippingMethod{
   constructor(title){
      this._title = title;
   }

   get title(){
      return this._title;
   }

   set taxable(taxable){
      this._taxable = taxable;
   }

   get taxable(){
      return this._taxable;
   }

   set cost(cost){
      this._cost = cost;
   }

   get cost(){
      return this._cost;
   }

}

export class FlatRateShipping extends ShippingMethod{
   constructor(title = 'Flat Rate Shipping'){
      super(title);
   }
}

export class FreeShipping extends ShippingMethod{
   constructor(title = 'Free Shipping'){
      super(title);
   }
}

export class LocalPickup extends ShippingMethod{
   constructor(title = 'Local Pickup'){
      super(title);
   }
}