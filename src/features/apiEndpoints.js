const API_VERSION = 'apiv1'
const API_ENDPOINTS = {}

Object.defineProperty(API_ENDPOINTS,'LOGIN',{get: `/${API_VERSION}/login`});
Object.defineProperty(API_ENDPOINTS,'LOGOUT',{get: `/${API_VERSION}/logout`});
Object.defineProperty(API_ENDPOINTS,'PERMISSION_BROWSE',{get: `/${API_VERSION}/permissions`});