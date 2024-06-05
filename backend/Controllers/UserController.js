const dotenv       = require('dotenv');
const UserModel    = require('../DB/user');
const RoleModel    = require('../DB/role');
const ProductModel = require('../DB/product');
const OrderModel   = require('../DB/order');

const Jwt          = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const md5          = require('md5');

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

        role             = await RoleModel.findOne({role_name:'user'});
        reqData.password = md5(md5(reqData.password));
        reqData.role_id  = role._id;

        checkUserExist   = await UserModel.findOne({email:reqData.email});
        if(checkUserExist){
               res.json({'status':false,'msg':'Email already register with us...'}); 
        }else{

                const signup     = await UserModel.create(reqData);

                Jwt.sign({signup},jwtKey,{expiresIn:JWTKEYEXP},(err,token)=>{
                    if(err){
                        res.json({'status':false,'msg':err}); 
                    }else{
                    res.cookie('token',token,{'sameSite':'strict','httpOnly':true,'path':'/'}).json({'status':true,'msg':'User Register Successfully','data':signup}); 
                    }
                    
                })
        }
        

        

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

             reqData.password = md5(md5(reqData.password));
             const user       =  await UserModel.findOne(reqData).select('-password');

             if(user){

                    Jwt.sign({user},jwtKey,{expiresIn:JWTKEYEXP},(err,token)=>{

                        if(err){
                            
                            res.json({'status':false,'msg':err}); 
                        }else{
                           res.cookie('token',token,{'sameSite':'strict','httpOnly':true,'path':'/'}).json({'status':true,'msg':'User Login Successfully','data':user});
                        }
                        
                    })
                 
             }else{
                 res.json({'status':false,'msg':'Invalid username or password '})
             }

        }catch(err){
            res.json({'status':false,'msg':err}) 
        }

    }else{
        res.json({'status':false,'msg':'Email and password can`t be balnk'})
    }

}


/*--------------------------------------------
| Logout Users
---------------------------------------------*/

const Logout  = async (req, res) => {

    let token = req.cookies.token;

    if(token){
         res.clearCookie('token').json({'status':true,'msg':'User Logout Successfully'})
    }else{
        res.json({'status':false,'msg':'Invalid request..'})
    }

}

const getProduct = async (req, res) => {

     try{
      
        const products = await ProductModel.find();
        res.json({'status':true,'msg':products});

    }catch(err){
        res.json({'status':true,'msg':err});
    }
    
}

const getOrders = async (req, res) => {

    try{
       const userId   = req.body.userId;
       const orders = await OrderModel.find({'user_id':userId});
       res.json({'status':true,'msg':orders});

   }catch(err){
       res.json({'status':true,'msg':err});
   }
   
}




module.exports =  {
    Index,
    Register,
    Login,
    Logout,
    getProduct,
    getOrders,
    
};