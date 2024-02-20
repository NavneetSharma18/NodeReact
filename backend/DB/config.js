const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://root:root@e-dashboard.eehbdod.mongodb.net/?retryWrites=true&w=majority').then(()=>{
		  console.log('DB Connected successfully...')
}).catch((err) =>{
	console.log('ERROR: ' +err)
})
