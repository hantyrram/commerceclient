
import apis from './apis';
import requestTypes from './requestTypes';
import {emit} from '../actionEvent';
import axios from '../axios';

//optional dispatch method no need to useAppStore here to avoid duplication since
//features will reference the appstore anyway

/**
 * onBeforeDispatch is a function that is passed the response from api call, 
 * to give time to modify the data from response before dispatching it to the store.
 * @param {Object} requestParams - The original params passed to the returned api request function
 * @param {Object} requestPayload - The original request payload to the returned api request function
 * @param {Object} responseData - The response of the api request data
 */
function defaultOnBeforeDispatch({requestParams,requestPayload,responseData}){
   return responseData.resource;
}

const HTTP_REQUEST_METHODS = ['get','post','put','patch','delete','connect','head','trace','options']
   
/**
 * 
 * Replaces params/optional params on currentPath with the values of the passed params object.
 * E.g. if params = { keyone:'keyonevalue',keytwo:'keytwovalue'} & 
 * currentPath = "apiv1/test/:keyone/pathpath/:keytwo".
 * Output will be "apiv1/test/keyonevalue/pathpath/keytwovalue".
 * 
 * @param {string} currentPath - The request path.
 * @param {Object} params - Object with keys that maps to currentPath params e.g. if currentPath has :test param
 * then currentPath will be replaced with params.test's value.
 * @return {string} - The path with params and/or optional params inserted.
 */
function insertParamsOnRequestPath(currentPath,params){
   //match optional ? for path with optional parameter
   let newPath = currentPath.replace(/:\w+\??/g, function(match){ 
      let key = match.replace(':','');
      if(key.includes('?')){ 
         //if an optional parameter was matched,remove before using as key
         key = key.replace('?','');
      }
      let paramValue = params[key]; 
      return paramValue;
   });
   return newPath;
}

function hasOptionalParam(currentPath){
   return /:\w+\?/.test(currentPath);
}

/**
 * @typedef {Object} ApiRequest~Action
 * @prop {string} type - The type of request. Must be one of the api definition keys. e.g PRODUCT_CREATE, 
 * suffixed with either '_PENDING', '_OK', 'NOK'.
 * @prop {Object|string} payload -  The response recieved from the api call.
 */

 /**
 * Function called with the received data from an api request. This allows modification of the
 * data before it's passed to dispatch function as payload.
 * 
 * @typedef {function} ApiRequest~onBeforeDispatch
 * @prop {Object|string|number} data -  The response recieved from an api request.
 * @return - The new data.
 */

/**
 * 
 * @param {string} requestType - Type of the request, is one of the apis key.
 * @param {function} dispatch - A function that is passed with the created {@see ApiRequest~Action}
 * @param {function} onBeforeDispatch - A function t
 */
export default function useApiRequest(requestType, dispatch, onBeforeDispatch = defaultOnBeforeDispatch) {

   /**
    * param = Object key matches the api param definition
    * payload - object or string
    * query = string for now
    */
   return async function({params,payload,query} = {}){
      
      let type  = requestTypes[requestType];
      console.log('useApiRequest params',params);
      console.log('useApiRequest payload',payload);
      if(!type){
         emit('error',{type:'CLIENT_ERROR',text:'Unsupported Api Request Type. Contact Administrator.'});
         return;
      }

      let api = apis[type];
      let indexOfRequestMethodSeparator = api.indexOf(':');
      let requestMethod = api.substr(0,indexOfRequestMethodSeparator); // get the request method portion of the path

      if(!HTTP_REQUEST_METHODS.includes(requestMethod)){
         emit('error',{type:'CLIENT_ERROR',text:'Unsupported Api Request Method. Contact Administrator.'});
         return;
      }

      let requestPath = api.slice(indexOfRequestMethodSeparator + 1, api.length);

      if(params){ //insert params on the request path
                       //NOTE: encodeURI
         // requestPath = encodeURI( insertParamsOnRequestPath(requestPath,params) ); //root
         requestPath = insertParamsOnRequestPath(requestPath,params);
      }

      //IMPORTANT, if param is optional and no param was passed, replace :param? portion of path with ''
      if(hasOptionalParam(requestPath) && !params){
         requestPath = requestPath.replace(/:\w+\?/,'');
      }

      if(query){
         requestPath += `?${query}`;
      }

      requestPath = encodeURI(requestPath);

      console.log('Request sent to ', requestPath, 'with Params',JSON.stringify(params));

      try {
         // dispatch({type: `${type}_PENDING`});
         
         let axiosResponse;

         if(payload){
            axiosResponse = await axios[requestMethod](requestPath,payload);         
         }else{
            axiosResponse = await axios[requestMethod](requestPath);
         }

         let { data } = axiosResponse;     
         
         if(axiosResponse.status >= 200 && axiosResponse.status < 300){ // && data.ok will not work on psgc data,raw data
            let modPayload = onBeforeDispatch({requestParams: params, requestPayload: payload,responseData: data}); //pass back the original params & payload
            
            console.log(data);
            if(dispatch && typeof(dispatch) === 'function'){
               dispatch({type: `${type}_OK`, payload: modPayload });
            }
            if(data.message){ // ???? SHOULD BE OPTIONAL, ADD AS AN OPTION
               emit('message',data.message);
            }
            return data;
         }


         dispatch && typeof(dispatch) === 'function' ? dispatch({type: `${type}_NOK`, error: data.error }) : null;
         emit('error',data.error);
         return data.error;
      } catch (error) {
       
         if(error.response && error.response.data){
              //error.response.data.error = actual server generated error object 
               dispatch && typeof(dispatch) === 'function' ? 
                  dispatch({type:'CLIENT_ERROR',text: error.response.data.error.text || 'Axios Error!'}) 
               :null;

              emit('error',{type:'CLIENT_ERROR',text: error.response.data.error.text || 'Axios Error!'});
              return;
         }
         
         dispatch && typeof(dispatch) === 'function' ? 
            dispatch({type:'CLIENT_ERROR',text:'Axios Error!'})
         : null;
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
   
}



