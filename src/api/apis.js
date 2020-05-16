//api endpoint definitions



export default {
   AUTH$LOGIN_EXEC: 'post:/apiv1/cbo/auth/login',
   AUTH$LOGOUT_EXEC: 'post:/apiv1/cbo/auth/logout',
   AUTH$AUTHENTICATE_EXEC: 'post:/apiv1/cbo/auth/authenticate',
   API_LIST: `get:/apiv1/cbo/apis`,
   EMPLOYEE_LIST: 'get:/apiv1/cbo/employees',
   EMPLOYEE_ADD: 'post:/apiv1/cbo/employees/empid_manual',
   EMPLOYEE_EDIT: 'patch:/apiv1/cbo/employees/:employeeId',
   EMPLOYEE$PHOTO_EDIT: 'post:/apiv1/cbo/employees/:employeeId/photo',
   EMPLOYEE$PHOTO_READ: 'get:/apiv1/cbo/employees/:employeeId/photo',
   EMPLOYEE_READ: 'get:/apiv1/cbo/employees/:employeeId',
   EMPLOYEE_VERIFY: 'post:/apiv1/cbo/employees/verify',
   USERACCOUNT_LIST: 'get:/apiv1/cbo/useraccounts',
   USERACCOUNT_READ: 'get:/apiv1/cbo/useraccounts/:useraccountId',
   USERACCOUNT$CREDENTIAL_CREATE: 'post:/apiv1/cbo/useraccounts/:useraccountId/credential',
   USERACCOUNT$CREDENTIAL_GENERATE: 'post:/apiv1/cbo/useraccounts/:useraccountId/generate',
   USERACCOUNT$ROLES_LIST: 'get:/apiv1/cbo/useraccounts/:useraccountId/roles',
   USERACCOUNT$ROLES_ADD:'post:/apiv1/cbo/useraccounts/:username/roles',
   USERACCOUNT$ROLES_DELETE: 'delete:/apiv1/cbo/useraccounts/:username/roles/:roleId',
   PERMISSION_LIST: 'get:/apiv1/cbo/permissions',   
   PRODUCT_LIST: 'get:/apiv1/cbo/products',
   PRODUCT_CREATE: 'post:/apiv1/cbo/products',
   PRODUCT_READ: 'get:/apiv1/cbo/products/:productId',
   PRODUCT_DELETE: 'delete:/apiv1/cbo/products/:productId',
   PRODUCT_UPDATE: 'patch:/apiv1/cbo/products/:productId',
   PRODUCT$IMAGES_ADD: 'post:/apiv1/cbo/products/:_id/images',
   PRODUCT$IMAGES_DELETE: 'delete:/apiv1/cbo/products/:product_id/images/:_id',
   PRODUCTCATEGORY_LIST: 'get:/apiv1/cbo/productcategories',
   PRODUCTCATEGORY_CREATE: 'post:/apiv1/cbo/productcategories',
   PRODUCTCATEGORY_DELETE: 'delete:/apiv1/cbo/productcategories/:productcategoryId',
   PRODUCTATTRIBUTE_LIST: 'get:/apiv1/cbo/productattributes',
   PRODUCTATTRIBUTE_CREATE: 'post:/apiv1/cbo/productattributes',
   PRODUCTATTRIBUTE_UPDATE: 'patch:/apiv1/cbo/productattributes/:productattributeId',
   PRODUCTATTRIBUTE$TERMS_ADD: 'patch:/apiv1/cbo/productattributes/:productattributeId/terms/add',
   PRODUCTATTRIBUTE$TERMS_REMOVE: 'patch:/apiv1/cbo/productattributes/:productattributeId/terms/remove',
   ROLE_LIST:'get:/apiv1/cbo/roles',
   ROLE_CREATE:'post:/apiv1/cbo/roles',
   ROLE_READ:'get:/apiv1/cbo/roles/:roleId',
   ROLE_DELETE:'delete:/apiv1/cbo/roles/:roleId',
   ROLE_EDIT:'patch:/apiv1/cbo/roles/:roleId',
   ROLE$PERMISSIONS_LIST: 'get:/apiv1/cbo/roles/:roleId/permissions',
   ROLE$PERMISSIONS_EDIT:'patch:/apiv1/cbo/roles/:roleId/permissions', //actually handled by role edit
   ROLE$PERMISSIONS_REMOVE:'patch:/apiv1/cbo/roles/:roleId/permissions/remove',//actually handled by role edit,no use for now
   UTIL$EXTDATA$COUNTRY_LIST:'get:/apiv1/cbo/util/extdata/countries',
   UTIL$EXTDATA$COUNTRYSTATE_LIST:'get:/apiv1/cbo/util/extdata/states/:country?',
   UTIL$EXTDATA$COUNTRYCITY_LIST:'get:/apiv1/cbo/util/extdata/cities/:state',
   UTIL$EXTDATA$PSGC_READ: 'get:/apiv1/cbo/util/extdata/psgc/:geolevel?',
   // SETTING_READ: 'get:/apiv1/cbo/settings',
   // SETTING$SHIPPINGZONE_ADD:'post:/apiv1/cbo/settings/shippingzone',
   // SETTING$SHIPPINGZONE_READ: 'get:/apiv1/cbo/settings/shippingzone',
   STORESETTING_LIST: 'get:/apiv1/cbo/storesettings',
   STORESETTING$BASIC_EDIT: 'patch:/apiv1/cbo/storesettings/:settingname',
   STORESETTING$SHIPPING$SHIPPINGZONE_LIST: 'get:/apiv1/cbo/storesettings/shipping/shippingzones',
   STORESETTING$SHIPPING$SHIPPINGZONE_ADD: 'post:/apiv1/cbo/storesettings/shipping/shippingzones',
   STORESETTING$SHIPPING$SHIPPINGZONE_EDIT: 'put:/apiv1/cbo/storesettings/shipping/shippingzones/:shippingZoneId',
   STORESETTING$SHIPPING$SHIPPINGZONE_DELETE: 'delete:/apiv1/cbo/storesettings/shipping/shippingzones/:_id',
   STORESETTING$SHIPPING$SHIPPINGZONE$SHIPPINGMETHOD_ADD: 'patch:/apiv1/cbo/storesettings/shipping/shippingzones/:shippingZoneId/shippingmethods',
   STORESETTING$SHIPPING$SHIPPINGZONE$SHIPPINGMETHOD_DELETE: 'delete:/apiv1/cbo/storesettings/shipping/shippingzones/:shippingZoneId/shippingmethods/:_name',
   STORESETTING$SHIPPING$SHIPPINGORIGIN_EDIT: 'patch:/apiv1/cbo/storesettings/shipping/shippingorigin',
   SEARCH_EXEC: 'get:/apiv1/cbo/search'
   //search?resource=product,key=slug,slug=abc,limit=1
}
