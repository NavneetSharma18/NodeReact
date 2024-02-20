const express                             = require('express');
const { addProduct,
        getProduct,deleteProduct,
        getSingleProduct,
        updateProduct,searchProduct }     = require('../Controllers/ProductController');
const router                              = express.Router();


/*--------------------------------------------
| Admin dashboard routes
---------------------------------------------*/

router.post('/add-product', addProduct);
router.get('/get-product', getProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/get-single-product/:id', getSingleProduct);
router.put('/update-product/:id', updateProduct);
router.get('/search/:key', searchProduct);

module.exports = router;