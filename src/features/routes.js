const routes = [
  {for : 'permission_browse', path: '/permissions'},
  {for : 'permission_read', path: '/permissions/:name'},
  {for : 'permission_edit', path: '/permissions/:name/edit'},
  {for : 'permission_add', path: '/permissions/add'},
]

export default function getRoute(routeName){
  return routes.find(route => route.for === routeName);
}