import React from 'react';
import { storiesOf } from 'storybook__react';
import EBrowser from './EBrowser';


let ProductUISchema = {
   _id : {
      el : "input",
      name: "id",
      label: "Id"
   },
   product_name : {
      el : "input",
      name: "product_name",
      label: "Product Name",
   },
   category: {
      el : "input",
      name: "category",
      label: "Category"
   }
}


let products = [
   {"_id":1236,"product_name":"Tuba","category":"NewCategory"},
   {"_id":1236,"product_name":"Tuba","category":"NewCategory"},
   {"_id":1236,"product_name":"Tuba","category":"NewCategory"}
]

const searchableFields = [
 'product_name',
 'category'
];

const actionsProvider = function(entity){
   return [
      { type: 'edit', ui:'Edit' },
      { type: 'delete', ui:'Delete' },
   ]
}

const entitiesPromise = new Promise((res)=>{
 console.log('Promise Called');
//  res(entities);
})

const onRead = (entity)=>console.log(entity);
const onAdd = ()=>{
   return new Promise((res)=>{
     let t = setTimeout(()=>{
        res( {"_id":1236,"product_name":"Tuba","category":"NewCategory"})
     },2000);
   })
}
const onEdit = (entity)=>console.log(entity);
const onDelete = (entity)=>{
   console.log('Deleting');
   return new Promise((res,rej)=>{
      let t = setTimeout(()=>{
         res(true);
         clearTimeout(t);
      },5000);
   });
}

const innerEBrowserOnSelect = (selectedEntities)=>{
   //save this,
   console.log(selectedEntities);
}
const actions = [
   {
      type : 'select'
   },
   // {
   //    name: 'delete'
   // }
]

storiesOf('EBrowser', module)
  .add('EBrowser',() => {
   let cache = [];
   const onSelect = (selected)=>{
      
      cache = selected;
      
   }
   const onAdd = ()=>{
      return new Promise((resolve,rej)=>{
         if(cache.length === 0){
           console.log('Adding', cache);
         }
      });
    }
      return (<EBrowser 
         uischema={ProductUISchema}
         entities={products} 
         entityIdentifier='name'
         onRead={onRead} 
         
         adderPromise = {()=>{
            return new Promise(res=>{
               console.log(cache);
             
               let t = setTimeout(()=>{
                  res(cache.map(e=> e.entity));
                  cache = [];
               },3000);
            });
         }}
         adderType="internal-modal"
         adderModalTitle="This Will Be Added to permission"
         adderModalContent={()=>{
            return <EBrowser 
               actions={[{type:'select'}]} 
               entities={products} 
               uischema={ProductUISchema} 
               onSelect={onSelect}/>
            }
         }
         adderModalActions = {[
            {type:'cancelAdd', ui: 'Cancel'},
            {type:'confirmAdd', ui: `Add Permissions to `}
         ]}
        
         onEdit={onEdit}
         onDelete={onDelete}
         searchable
         actions={actions}
         onSelect={(selectedEntities)=>{
            console.log(JSON.stringify(selectedEntities));
         }}
         // maxRowPerPage
         // maxRowExceeded
         searchableFields={searchableFields}
      />)
   }
);