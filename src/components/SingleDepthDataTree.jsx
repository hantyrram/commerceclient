
import React, { useEffect } from 'react';

//data must have single depth, with parent
export default ({data,rootName})=>{

   function getChildren(object){
      return data.filter(cat=>cat.parent === object.name);
   }
   
   function hasChildren(object){
      return getChildren(object).length === 0? false: true;
   }

   function createTree(source,parent){

      for(let object of source){
        
        // let el = hasChildren(object)? newParent(object): document.createElement('li');
       if(hasChildren(object)){
       
            let ul = document.createElement('ul');
              ul.innerHTML = object.name;
              ul.style.listStyle = 'none';
              ul.style.cursor = 'default';
              ul.style.paddingInlineStart = '1em';
           let li = document.createElement('li');
           ul.appendChild(li);
            parent.appendChild(ul);
           let children = getChildren(object);
           createTree(children,li);
           
           for(let ch of children){
              let i = data.findIndex(c=> c.name === ch.name);
             if(i!== -1){
              data.splice(i,1);
             }
           }
       }
       else{
         console.log('Tag Name ',parent.tagName);
         let child = parent.tagName.toLowerCase() === 'li'? document.createElement('span'): document.createElement('li');
         /* let li = document.createElement('li');
         li.innerHTML = object.name; */
         child.style.paddingInlineStart = '1em';
         child.style.cursor = 'inherit';
         child.innerHTML = object.name;
          parent.appendChild(child);
       }
      
     }
   return parent;
   }

   useEffect(()=>{
      let container = document.getElementById("SingleDepthDataTree");
      let root = document.createElement('ul');
      root.style.listStyle = 'none';
      root.style.cursor = 'default';
      root.innerHTML = `<span>${rootName}</span>`;
      let rootLi = document.createElement('li');
      root.appendChild(rootLi);
      container.appendChild(root);
      createTree(data,rootLi)
   },[]);

   return(
      <div id="SingleDepthDataTree"></div>
   )
}