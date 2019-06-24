import React, { Component } from 'react';
import './SideNav.css';
import style from 'styled-components';
import {Link} from 'react-router-dom';

const A = style.a`
 text-decoration:none;
`;
const DropdownContent = style.ul`
  display:none;
`
const DropdownContentItem = style.li`

`

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidUpdate(){
    this.refs.dropdownTrigger.addEventListener('click',function(e){
      if(e.target.className === 'dropdown-trigger'){
        let contentId = e.target.getAttribute("content");
       if(document.getElementById(contentId).style.display === 'block' || document.getElementById(contentId).style.display === ''){
        document.getElementById(contentId).style.display = 'none';
       }else{
        document.getElementById(contentId).style.display = 'block';
       }
       e.stopPropagation();
      }
     
    },true);
  }
  
  componentDidMount(){
   
  }
  
  render() { 
    if(!this.props.features || this.props.features.length < 1){
      return null;
    }
    const features = this.props.features;
    let groups = [];
    for(let feature of features){
     if(!feature.featureGroup  || groups.includes(feature.featureGroup)){
       continue;
     }else{
      groups.push(feature.featureGroup);
     }
    }

    groups.sort();

    return ( 
      <div id="sidenav">
      <ul>
        {/* <li><i className="fas fa-th-list"></i><A href="#" >Catalog</A></li>
        <li><i className="fas fa-user-cog"></i><A href="#">User Management</A></li> */}
        {
         groups.map(g=>{
          const groupKey = g.replace(/\s/g,'');
          return(
            //key = group name without spaces
            <li> <div id="x" ref="dropdownTrigger" className="dropdown-trigger" key={groupKey+'key'} content={groupKey} >{g}</div> 
              <DropdownContent id={groupKey}  >
               {
                features.reduce((acc,feature)=>{
                 if(feature.featureGroup === g){
                  acc.push(<DropdownContentItem key={feature.name}><Link to={feature.path}>{feature.name}</Link></DropdownContentItem>)
                 }
                 return acc;
                },[]).map(e=>{return e;})
               }
               
               </DropdownContent>
            </li>
           )
         })
        }
      </ul>
      {/* ??also add features not in a group here*/}
    </div>
     );
  }
}
 
export default SideNav;

