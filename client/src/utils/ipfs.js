const IPFS = require('ipfs-api');
const ipfs = new IPFS({host: 'localhost', port: 5001 });


const cors = require('cors')
//app.use(cors('localhost: 3000'))



export default ipfs; 