const mongoose = require('mongoose');


const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = mongoose.Schema({

  name:{
    type: String, 
    required: true,
    min: [3, 'Must be at least 3, got {VALUE}'],
    max: 80
  },
  email:{ 
    type: String, 
    required: true,
    min: [3, 'Must be at least 3, got {VALUE}'],
    max: 80,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
  },
  password:{ 
    type: String, 
    min: [3, 'Must be at least 3, got {VALUE}'],
    required: true
  },
  date: { type: Date, default: Date.now },
  
  role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
  
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel