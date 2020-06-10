/**
 * High order component. Used in wrapping a feature's context component.
 */

export default ( Comp, data, otherProps ) => {
   return (props)=>{

      return(
         <Comp data = {data} {... { ...props, ...otherProps}} />
      )
   }
      
}