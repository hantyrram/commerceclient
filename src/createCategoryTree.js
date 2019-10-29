// css 
// ul{
//    list-style:none;
//    pointer: cursor;
//  }
//  span:before {
//    content: url("https://img.icons8.com/android/24/000000/folder-invoices.png")
//  }

const categories = [
	{name: "Mens"},
  {name: "Womens"},
  {name: "Pants", parent: "Mens"},
  {name: "Skirts", parent: "Womens"},
  {name: "Mini Skirts", parent: "Skirts"},
  {name: "Collectible"},
  {name: "Super Mini Skirts", parent: "Mini Skirts"},
]

let container = document.getElementById("c");

let root = document.createElement('ul');
root.innerHTML = '<span>Categories</span>';

let rootLi = document.createElement('li');
root.appendChild(rootLi);

container.appendChild(root);



function getChildren(category){
	return categories.filter(cat=>cat.parent === category.name);
}

function hasChildren(category){
	return getChildren(category).length === 0? false: true;
}

function newParent(category){
	let ul = document.createElement('ul');
  ul.innerHTML = category.name;
  let li = document.createElement('li');
  ul.appendChild(li);
  return ul;
}

function createCategoryTree(cats,parent){

	for(let category of cats){
  	
  	// let el = hasChildren(category)? newParent(category): document.createElement('li');
    if(hasChildren(category)){
    
      	let ul = document.createElement('ul');
  			ul.innerHTML = category.name;
        let li = document.createElement('li');
        ul.appendChild(li);
      	parent.appendChild(ul);
        let children = getChildren(category);
        createCategoryTree(children,li);
        
        for(let ch of children){
        	let i = categories.findIndex(c=> c.name === ch.name);
          if(i!== -1){
           categories.splice(i,1);
          }
        }
    }
    else{
      console.log('Tag Name ',parent.tagName);
      let child = parent.tagName.toLowerCase() === 'li'? document.createElement('span'): document.createElement('li');
      /* let li = document.createElement('li');
      li.innerHTML = category.name; */
      child.innerHTML = category.name;
    	parent.appendChild(child);
    }
   
  }
return parent;
}
console.log(createCategoryTree(categories,rootLi));

