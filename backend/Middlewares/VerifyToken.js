const Jwt          = require('jsonwebtoken');
const dotenv       = require('dotenv');

dotenv.config();

const jwtKey       = process.env.JWT_KEY;


const VerifyToken = (req,res,next)=>{

    let token = req.headers.authorization;
     
  
    if(token && token.length >0 ){
        
        token    = req.headers.authorization.split(' ');
        token    = token[1];
    }

    if(token){
    	 Jwt.verify(token,jwtKey,(err,valid)=>{

    	 	if(err){
    	 		res.json({'status':false,'msg':'Invalid token, try agian..'});
    	 		
    	 	}else{

    	 		next();
    	 	}
    	 })
    	 

    }else{
    	res.json({'status':false,'msg':'Invalid request, make sure all the param is correct'});
    }
   
}


module.exports = {
	VerifyToken
}