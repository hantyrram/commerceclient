
import ActiveUser from './ActiveUser';
import { subscribe } from './artifactEmitter';

// jest.mock('./axios');

it('It can login and logout a user',async done =>{
 subscribe('login',(artifact)=>{
  console.log('Logging in');
  console.log(artifact);
  expect(artifact.status).toBe('ok');
  done();
 });
 subscribe('logout',(artifact)=>{
  console.log('Logging Out');
  console.log(artifact);  
  expect(artifact.status).toBe('ok');
  done();
 });
 let user = new ActiveUser({username:'htu00001',password:'11111111'});
 try {
  await user.login();
  await user.logout();
  done();
 } catch (error) {
  console.log(error);
 }
 
});
