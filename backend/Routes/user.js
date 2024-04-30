const express                             = require('express');
const {Index,Register,Login,Logout,getProduct,getOrders} = require('../Controllers/UserController');
const router                              = express.Router();


/*--------------------------------------------
| Admin dashboard routes
---------------------------------------------*/

router.get('/', Index);
router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);
router.get('/get-product', getProduct);
router.post('/get-orders', getOrders);





module.exports = router;