import React, {useState,useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';

export function CategoryTree({category, data, selected, onSelect , onAdd , onDelete }){

   let [c,setC] = useState(category);
   let [mode,setMode] = useState(null);
   let spanRef = useRef();
   let divRef = useRef();
   let inputRef = useRef();
   
   let ch;

   if(category._id === 'root'){
      ch = data.filter(category=> !category.parent);
   }else{
      ch = data.filter(category=> category.parent === c._id);
   }

   function selectHandler(e){
      e.preventDefault();
      // e.currentTarget.style.backgroundColor = 'grey';
      let selectedCategory = JSON.parse(e.currentTarget.attributes.categorydata.value)
      
      onSelect(selectedCategory);
      setMode('select');
   }

   function addCategoryClickHandler(e){
      setMode('add');
      e.stopPropagation(); //bec button is enclosed in span
   }

   function deleteCategoryHandler(e){
      if(onDelete){
         onDelete(selected);
      }
      e.stopPropagation();//bec button is enclosed in span
   }

   function inputChangeHandler(e){
      console.log(e.target.value);
   }

   //set margins effect
   useEffect(()=>{
      divRef.current.style.marginLeft = '1em';
      spanRef.current.style.marginLeft = '1em';
      if(category._id === 'root'){
         divRef.current.style.marginLeft = 0;
         spanRef.current.style.marginLeft = 0;
      }
      spanRef.current.style.cursor = 'default';
      spanRef.current.style.padding = '.20em';
      spanRef.current.style.marginTop = '.1em';
      spanRef.current.style.marginBottom = '.1em';
      
   },[]);

   //display add input box effect
   useEffect(()=>{
      if(mode === 'add'){
         inputRef.current.focus();
         inputRef.current.style.marginLeft = '1em';
         inputRef.current.onblur = ()=>{
            //category, parent
            let parent = Object.assign({},selected);
            if(selected._id === 'root'){ // nullify parent if parent was root
               parent = null;
            }
            console.log('Blurring');
            if(inputRef.current.value.length > 0){//on non-empty value
               onAdd(inputRef.current.value, parent);
            }            
            setMode('notadd');
         };
      }
   },[mode]);

   //change selected backgroundColor effect
   useEffect(()=>{
     if(selected._id === category._id){
        spanRef.current.style.backgroundColor = '#d6d2d2';
  
     }else{
      spanRef.current.style.backgroundColor = null;
     }
   },[selected,category]);


   return(
      <div ref={divRef} style={{width:"100%"}}>
         
         <div >
            <span ref={spanRef} 
                  categorydata={JSON.stringify(c)} 
                  onClick={selectHandler} 
                  style={{minWidth:"40%",display:'flex',alignItems:"center",justifyContent:"space-between"}}>
               { c.name }
               {
                  selected._id === c._id? 
                     <span style={{display:'flex',alignItems:'center'}}>
                        {
                           onAdd ?
                           // <button class="action-button ctree-action-button" onClick={addCategoryClickHandler}>
                           //     Add {category._id !== 'root' ? 'Sub': 'New'} Category
                           // </button>
                              // <AddIcon color="primary" onClick={addCategoryClickHandler}>Add {category._id !== 'root' ? 'Sub': 'New'} Category</AddIcon>
                           <button onClick={addCategoryClickHandler}  style={{display:'flex',alignItems:'center',border:'none',marginRight: '.5em'}}class="action-button ctree-action-button" >
                              <AddIcon color="primary" onClick={addCategoryClickHandler} /> Add {category._id !== 'root' ? 'Sub': 'New'} Category
                           </button>
                           :null
                        }
                        

                        {
                           category._id !== 'root' && onDelete?                              
                              // <button class="action-button ctree-action-button" onClick={deleteCategoryHandler}>
                              //    - Delete Category
                              // </button>   
                              <button onClick={deleteCategoryHandler} style={{display:'flex',alignItems:'center',border:'none'}} class="action-button ctree-action-button" >
                                 <RemoveIcon color="secondary" /> Delete Category
                              </button>
                           :null
                           
                        }
                        
                     </span>
                     
                  : null
               }
            </span> 
         </div>
         

         {
            ch.map(child=>{
               //onSelect,onAdd,selected, is passed down recursively
               return <CategoryTree 
                        category={child} data={data} selected={selected} 
                        onSelect={onSelect} onAdd={onAdd} onDelete={onDelete}
                     />
            })
         }
         { 
            mode === 'add' ? 
               <div style={{marginLeft:'1em'}}>
                  <input ref={inputRef} type="text" onChange={inputChangeHandler}/>
               </div> 
            : null
         }
      </div>
   )
}


CategoryTree.propTypes = {
   /**
    * The Category object
    */
   category: PropTypes.object,

   /**
    * The Categories array
    */
   data: PropTypes.array,

   /**
    * The callback function to be called with the selected category.
    * Triggered when a category is selected/clicked.
    * 
    * @function 
    */
   onSelect: PropTypes.func,

   /**
    * The callback function to be called after entering the new category to be added.
    * Triggered when the add input box is blurred
    * 
    * @function 
    */
   onAdd: PropTypes.func,
}