import axios from 'axios';

export default axios.create({
 timeout: 3000,
 headers: {'X-Requested-With': 'XMLHttpRequest'}
});