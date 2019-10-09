import { EmployeeBrowseRequest } from 'requests';

export default async ()=>{
   let request = new EmployeeBrowseRequest();
   let artifact = await request.send();
   return { type: 'employee_browse', employees: artifact.data.entity }
}