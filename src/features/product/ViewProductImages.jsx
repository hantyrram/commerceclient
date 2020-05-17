import React from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useGridTitleBarStyles = makeStyles({
   root: {
      backgroundColor: 'unset'
   }
});

export default ({product})=>{
   const gridTitleBarClasses = useGridTitleBarStyles();
   const {dispatch} = useAppState();
   const addImage = useApiRequest("PRODUCT$IMAGES_ADD",dispatch);   
   const deleteImage = useApiRequest("PRODUCT$IMAGES_DELETE",dispatch, ({requestParams,responseData})=>{
      return { ...requestParams } //product_id,_id
   });   

   const handleAddImage = (e)=>{
      let formData = new FormData();
      formData.set(e.currentTarget.name,e.currentTarget.files[0]);
      addImage({params: { _id: product._id}, payload: formData});
   }

   const handleImageDelete = (image)=>{

      return e => {
         console.log('Deleting', image);
         deleteImage(
            {
               params: {
                  product_id: product._id,
                  _id: image._id
               }
            }
         )
      }
   }
   console.log(product.images);
   
   return(
      <div className="feature-context">
         <div className="feature-context-title">
            Images : {product.name}
         </div>
         {
            product.images ? 
               <div>
                  <div>
                     <form action="">
                        <label htmlFor="productImage">Add Product Image</label>
                        <input name="productImage" type="file" onChange={handleAddImage}/>  
                     </form>
                     {/* <form action="">
                        <input accept="image/*" formmethod="post" formaction={`/apiv1/products/${product._id}/images`} 
                           name="productImage" type="image" height="300" formtarget="_top" alt="Add Product Image" />  
                     </form> */}
                  </div>
                  <GridList cols={3} cellHeight={200}>
                     {
                        product.images.map( i => 
                           <GridListTile key={i._id} cols={1}>
                              <img src={`/cbo/apiv1/products/${product._id}/images/${i._id}?bust=${Date.now()}`} alt={i.title} />
                              <GridListTileBar 
                                 className={gridTitleBarClasses.root}
                                 actionIcon = {
                                    <DeleteForeverSharpIcon color="secondary" onClick={ handleImageDelete(i) }/>
                                 }
                              />
                           </GridListTile>
                        )
                     }
                  </GridList>
               </div>
               
            :   <div>
                  <form action="">
                     <label htmlFor="productImage">Add Product Image</label>
                     <input name="productImage" type="file" onChange={handleAddImage}/>  
                  </form>
               </div>
             
         }
      </div>
   )
}