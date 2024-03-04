const express           = require('express');
const dotenv            = require('dotenv');
const mongoose          = require('mongoose');
const md5               = require('md5');
const app               = express();
const Role              = require('./DB/role');
const User              = require('./DB/user');


require('./DB/config');

/*------------------------------------------
| Insert demo data for role collection
--------------------------------------------*/

const seedRole =[
			{
				label    :'Adminstrative',
				role_name:'admin'
			},
			{
				label    :'User',
				role_name:'user'
			},
	];


const seedRoleData = async() => {

	 await Role.deleteMany({})
	 await User.deleteMany({})

	 seedRole.forEach(function(val){
	 	console.log(val)

      const roleModel      = new Role();
      const userModel      = new User();

      roleModel.label      = val.label;
      roleModel.role_name  = val.role_name;
	  
      const result = roleModel.save().then(res => {

      	

      	     if(val.role_name == 'admin'){

			  	  
			      userModel.name      = 'Admin';
			      userModel.password  = md5(md5('admin@123'));
			      userModel.email     = 'admin@admin.com';
			      userModel.role_id   = res._id;
				  
				  userModel.save().then(data => {
				      	  console.log(data);

				   }).catch( err =>{
				            console.log(err)
				   });

			  }else{
			  	  userModel.name      = 'Test User';
			      userModel.password  = md5(md5('testuser@123'));
			      userModel.email     = 'testuser@user.com';
			      userModel.role_id   = res._id;

				  userModel.save().then(data => {
				      	  console.log(data);

				   }).catch( err =>{
				            console.log(err)
				   });
			  }

       }).catch( err =>{
            console.log(err)
      });

    

	});
	 
};

seedRoleData().then(()=>{
	//mongoose.connection.close()
	console.log('--done---')
})
