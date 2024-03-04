const mongoose = require("mongoose");



/*----------------------------------------------------------
| Declare model schemas and Create model in mongo FOr Roles
----------------------------------------------------------*/



const roleSchema = mongoose.Schema({

  label: {
    type: String,
    min: [3, "Invalid role label must have at least 3 char."],
    required: [true, "Role label can't be blank"],
  },
  role_name:{
    type: String,
    min: [3, "Invalid rolename must have at least 3 char."],
    required: [true, "Role name can't be blank"],
  }
   
  
 
});


const Role = mongoose.model("Role", roleSchema);




module.exports = Role;