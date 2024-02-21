const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
const url = 'mongodb+srv://root:root@e-dashboard.eehbdod.mongodb.net/mern_app?retryWrites=true&w=majority';

mongoose.connect(url).then(()=>{
		  console.log('DB Connected successfully...')
}).catch((err) =>{
	console.log('ERROR: ' +err)
})