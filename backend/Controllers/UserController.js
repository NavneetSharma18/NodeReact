const dotenv       = require('dotenv');
const UserModel    = require('../DB/user');
const Jwt          = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

dotenv.config();
const jwtKey       = process.env.JWT_KEY;
const JWTKEYEXP    = process.env.JWT_KEY_EXP;



/*--------------------------------------------
| Index Routes
---------------------------------------------*/


const Index = async (req, res) => {

     try{
        const products = await ProductModel.find();
        res.json(products);

    }catch(err){
        res.json(err);
    }
    
}

/*--------------------------------------------
| Register Routes
---------------------------------------------*/

const Register = async (req, res) => {

    const reqData = req.body;

    try{
        const signup  = await UserModel.create(reqData);

        Jwt.sign({signup},jwtKey,{expiresIn:JWTKEYEXP},(err,token)=>{
            if(err){
                console.log('error is',err);
                res.json({'status':false,'msg':err}); 
            }else{
               res.json({'status':true,'msg':'User Signup|Register Successfully','data':signup,'token':token}); 
            }
            
        })

        

    }catch(err){
        res.json({'status':false,'msg':err});
    }
    
}

/*--------------------------------------------
| Login Routes
---------------------------------------------*/

const Login = async (req, res) => {

    const reqData = req.body;

    if(reqData.email && reqData.password){

        try{
             const user =  await UserModel.findOne(reqData).select('-password');

             if(user){

                    Jwt.sign({user},jwtKey,{expiresIn:JWTKEYEXP},(err,token)=>{

                        if(err){
                            
                            res.json({'status':false,'msg':err}); 
                        }else{
                           res.cookie('token',token,{'sameSite':'strict','httpOnly':true,'path':'/','expiresIn':new Date(Date.now() + 3600 * 1000)}).json({'status':true,'msg':'User Login Successfully','data':user,'token':token});
                        }
                        
                    })
                 
             }else{
                 res.json({'status':false,'msg':'User doesn`t exist'})
             }

        }catch(err){
            res.json({'status':false,'msg':err}) 
        }

    }else{
        res.json({'status':false,'msg':'Email and password can`t be balnk'})
    }

}



module.exports =  {
    Index,
    Register,
    Login,
};