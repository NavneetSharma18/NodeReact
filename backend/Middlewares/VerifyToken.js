const Jwt          = require('jsonwebtoken');
const dotenv       = require('dotenv');

dotenv.config();

const jwtKey       = process.env.JWT_KEY;


const VerifyToken = (req,res,next)=>{

    let token = req.cookies.token;

    if(token){

    	   Jwt.verify(token,jwtKey,(err,valid)=>{

    	 	if(err){
    	 		res.json({'status':false,'msg':err+' Invalid token, try agian..'});
    	 		
    	 	}else{
    	 		next();
    	 	}
    	 })
    	 

    }else{
    	res.json({'status':false,'msg':'Invalid param...try agian.'});
    }
   
}


module.exports = {
	VerifyToken
}