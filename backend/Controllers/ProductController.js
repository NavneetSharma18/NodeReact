const ProductModel = require('../DB/product');

/*--------------------------------------------
| Index Routes
---------------------------------------------*/


const addProduct = async (req, res) => {

     try{
      
        const products = await ProductModel.create(req.body);
        res.json({'status':true,'msg':products});

    }catch(err){
        res.json({'status':false,'msg':err});
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

const deleteProduct = async (req, res) => {

     try{
        
        const products = await ProductModel.findById({_id:req.params.id}).deleteOne();
        res.json({'status':true,'msg':'Product deleted successfully!'});

    }catch(err){
        res.json({'status':true,'msg':err});
    }
    
}

const getSingleProduct = async (req, res) => {

     try{
        
        const product = await ProductModel.findById({_id:req.params.id}).select('-user_id');
        res.json({'status':true,'msg':product});

    }catch(err){
        res.json({'status':true,'msg':err});
    }
    
}

const updateProduct = async (req, res) => {

     try{
        
        const product = await ProductModel.updateOne({_id:req.params.id},{$set:req.body});
        res.json({'status':true,'msg':'Product updated successfully!'});

    }catch(err){
        res.json({'status':true,'msg':err});
    }
    
}

const searchProduct = async (req, res) => {

     try{
        
        const product = await ProductModel.find({
            "$or":[

                  {product_title:{$regex:req.params.key}},
                  {product_description:{$regex:req.params.key}},
                  
             ]
        });
        res.json({'status':true,'msg':product});

    }catch(err){
        res.json({'status':true,'msg':err});
    }
    
}









module.exports =  {
    addProduct,
    getProduct,
    deleteProduct,
    getSingleProduct,
    updateProduct,
    searchProduct,
};