import React, { useContext,useEffect } from 'react';
import ActiveTable from 'components/ActiveTable';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import requestTypes from 'api/requestTypes';
import { request } from 'http';
import feature from '../feature';
// import {useApi_List} from 'actions/Api';


function Apis(props){
   let { getAppState, dispatch } = useAppState();
   let fetchApis = useApiRequest(requestTypes.API_LIST, dispatch);
   let { apis } = getAppState();

   useEffect(()=>{
      fetchApis();
   },[]);

   const columnHeaders = [
      { path: 'Path' },
      { method: 'Method' },
      { resource: 'Resource' },
      { op: 'Operation' },
      {serviceProvider: 'Service Provider'}
   ]

   return(
      <ActiveTable 
         data={apis} 
         columnHeaders={ columnHeaders }
      />    
   )
}

export default feature(Apis,{title:'Apis'})
   



