
import React, { useEffect } from 'react';

//data must have single depth, with parent
export default ({data,rootName, identifierName = '_id'})=>{

   function getChildren(object){
      return data.filter(cat=>cat.parent === object.name);
   }
   
   function hasChildren(object){
      return getChildren(object).length === 0? false: true;
   }

   function createTree(source,parent){
      for(let object of source){
         console.log(object);
         if(hasChildren(object)){
            let ul = document.createElement('ul');
            ul.setAttribute("id",object[identifierName]);
            let branch = document.createElement('li');
            branch.innerHTML = object.name;
            branch.classList.add("node");
            branch.classList.add("parent");
            // ul.innerHTML = '<h5>' + object.name + '</h5>';
            ul.appendChild(branch);
            ul.style.listStyle = 'none';
            ul.style.cursor = 'default';
            ul.style.paddingInlineStart = '1em';
            let li = document.createElement('li');
            ul.appendChild(li);
            parent.appendChild(ul);
            let children = getChildren(object);
            createTree(children,li);
            for(let ch of children){
               let i = data.findIndex(c=> c.name === ch.name && c.parent === ch.parent);
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
            
            child.classList.add("leaf");
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
      root.innerHTML = `<span className="sddt-leaf">${rootName}</span>`;
      let rootLi = document.createElement('li');
      root.appendChild(rootLi);
      container.appendChild(root);
      createTree(data,rootLi)
   },[]);

   return(
      <div id="SingleDepthDataTree"></div>
   )
}