
import React, { useEffect, useState, useRef } from 'react';

//data must have single depth, with parent
export default ({data,rootName = 'Categories', identifierName = '_id', onSelect, onAdd})=>{

   
   let [state,setState] = useState({
      selected:null,
      prevSelected: null,
      data
   });
   let cache = [...data]; // we need original data for lookup
   function getChildren(category){
      return cache.filter(cat=>cat.parent === category._id); //changed data to cache
   }
   
   function hasChildren(category){
      return getChildren(category).length === 0? false: true;
   }
   
   function hasParent(category){
      return Boolean(cache.filter(cat=>cat.parent).length);//0 is false //cchanged data to cache
   }
   
   function createCategoryTree(cats,parent){
      for(let category of cats){
        // let el = hasChildren(category)? newParent(category): document.createElement('li');
       if(hasChildren(category)){
            let div = document.createElement('div');
            div.classList.add("node");
            div.classList.add("parent");
            if(hasParent(category)){
               div.classList.add("child");
            }
            let span = document.createElement('span');
            span.classList.add('sddt-item');
            span.id = category[identifierName];
            span.style.cursor = 'default';
            span.innerHTML = category.name;
            span.setAttribute('sddt-item-data',JSON.stringify(category));
            div.appendChild(span);
         //   div.innerHTML = `<span>${category.name}</span>`;   
            div.style.marginLeft = "1.5em";
            parent.appendChild(div);
            let children = getChildren(category);
            
            createCategoryTree(children,div);        
            for(let ch of children){
               let i = data.findIndex(c=> c.name === ch.name);
               if(i!== -1){
                  data.splice(i,1);
               }
            }
       }
       else{
         let child = document.createElement('div')
         child.style.marginLeft = "1.5em";
         let span = document.createElement('span');
         span.classList.add('sddt-item');
         span.style.cursor = 'default';
         span.id = category[identifierName];
         span.innerHTML = category.name;
         span.setAttribute('sddt-item-data',JSON.stringify(category));
         // child.innerHTML = `<span>${category.name}</span>`;
         child.classList.add("node");
         child.classList.add("child");
         child.appendChild(span);
          parent.appendChild(child);
       }
      
     }
   return parent;
   }

   useEffect(()=>{
      let root = document.getElementById("sddt-root");
      while(root.firstChild){
         root.remove(root.firstChild);
      }
      let span = document.createElement('span');
      span.classList.add('root');
      span.classList.add('parent');
      span.classList.add('sddt-item');
      span.id = 'sddt-root-category';
      span.innerHTML = rootName;
      span.style.cursor = 'default';
      span.setAttribute('sddt-item-data',JSON.stringify({_id:'sddt-root-category',name:rootName}));
      root.appendChild(span);     
      createCategoryTree(state.data,root);
      console.log('Load Effect');
      console.log(JSON.stringify(state.data) === JSON.stringify(data));
      console.log(data);
   },[data]);

 
   useEffect(()=>{//add click event 
      let sddtItems = document.getElementsByClassName("sddt-item");
      for(let sddtitem of sddtItems){
         sddtitem.onclick = function(e){
            e.target.classList.add("selected");
            let selectedCategory = JSON.parse(e.target.getAttribute('sddt-item-data'));      
            setState({selected: selectedCategory, prevSelected: Object.assign({}, state.selected)});
            if(onSelect){
               onSelect(selectedCategory);
            }
         }
         
      }
      console.log('Selected Effect');
   });

   useEffect(()=>{
      if(state.prevSelected && state.prevSelected._id){
         //clean up previously selected,remove adder button,adder input,selected class
         let sddtitem = document.getElementById(state.prevSelected._id);
         sddtitem.style.backgroundColor = '';
         sddtitem.classList.remove("selected");
         let adderBtn = document.getElementById(state.prevSelected._id + 'adderBtn');
         if(adderBtn){
            adderBtn.remove();
         }
         let prevInput = document.getElementById("childof" + state.prevSelected._id);
         if(prevInput){
            prevInput.remove();
         }
      }

      if(state.selected){
         let categoryNode = document.getElementById(state.selected._id);
         console.log(categoryNode);
         categoryNode.style.backgroundColor = '#d2d2da';
         if(!document.getElementById(state.selected._id + 'adderBtn')){//button not yet displayed
            let adderBtn = document.createElement('button');
            adderBtn.innerHTML = '+ Add Category';
            adderBtn.id = state.selected._id + 'adderBtn';
            adderBtn.style.marginLeft = "1.5em";
            adderBtn.onclick = function(e){
               console.log('Clicked');
               //check if input element is already displayed
               if(categoryNode.parentNode.lastChild.nodeName=== 'INPUT'){
                  //avoids duplicate input element
                  return;
               }
               let input = document.createElement('input');
               input.id = "childof" + state.selected._id; //set the parent id as id of the input with prefix "childof"
               input.style.marginLeft = "1em";
               input.style.display = 'block';
               categoryNode.parentNode.insertBefore(input,null);
               input.focus();
               input.onblur = function(){
                  console.log('Blurring INput');
                  //trigger onChange here if input length > 0
               }
         
               input.onchange = function(e){
                  if(onAdd){
                     let parent = Object.assign(state.selected);
                     if(state.selected.name === rootName){ // Nullify parent if root is selected on add
                        parent = null;
                     }
                     
                     onAdd({name: e.target.value,parent});
                  }
                  input.remove();
               }
            }
            categoryNode.parentNode.insertBefore(adderBtn,categoryNode.parentNode.firstChild.nextSibling);
         }
      }
      
      console.log('Toggle Selected Effect');
   });

   return(
      <div>
         <div>Selected: {JSON.stringify(state.selected)}</div>
         <div id="sddt-root">
         
         </div>   
      </div>
   )
}



