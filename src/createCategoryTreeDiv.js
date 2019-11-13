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

let root = document.createElement('div');
root.innerHTML = 'Categories';

container.appendChild(root);



function getChildren(category){
	return categories.filter(cat=>cat.parent === category.name);
}

function hasChildren(category){
	return getChildren(category).length === 0? false: true;
}

function hasParent(category){
	return Boolean(categories.filter(cat=>cat.parent).length);//0 is false
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
        
        div.innerHTML = `<span>${category.name}</span>`;      	
      	parent.appendChild(div);
        let children = getChildren(category);
        
        createCategoryTree(children,div);        
        for(let ch of children){
        	let i = categories.findIndex(c=> c.name === ch.name);
          if(i!== -1){
           categories.splice(i,1);
          }
        }
    }
    else{
      let child = document.createElement('div')
      child.innerHTML = `<span>${category.name}</span>`;
      child.classList.add("node");
      child.classList.add("child");
    	parent.appendChild(child);
    }
   
  }
return parent;
}
console.log(createCategoryTree(categories,root));

let previousNode = null;
let currentNode = null;
for(let node of document.getElementsByClassName("child")){
	console.log(document.getElementsByClassName("child"));
  
  node.style.paddingLeft = "1em";
  node.style.cursor = "default";
  node.firstChild.addEventListener('click',function(e){
    let event = new Event('selectNode');
    e.currentTarget.dispatchEvent(event);
  });
  node.firstChild.addEventListener('selectNode',function(e){
  	e.currentTarget.style.backgroundColor = "blue";
  });
  
  node.firstChild.addEventListener('focusout',function(e){
  	console.log('Focus out');
  	e.currentTarget.style.backgroundColor = "";
  });
}

