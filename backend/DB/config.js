const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
const url = 'mongodb://root:root@ac-3riztx2-shard-00-00.eehbdod.mongodb.net:27017,ac-3riztx2-shard-00-01.eehbdod.mongodb.net:27017,ac-3riztx2-shard-00-02.eehbdod.mongodb.net:27017/mern_app?ssl=true&replicaSet=atlas-t6h79v-shard-0&authSource=admin&retryWrites=true&w=majority';
//const url = 'mongodb+srv://root:root@e-dashboard.eehbdod.mongodb.net/mern_app?retryWrites=true&w=majority';

mongoose.connect(url).then(()=>{
		  console.log('DB Connected successfully...')
}).catch((err) =>{
	console.log('ERROR: ' +err)
})