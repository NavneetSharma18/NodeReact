const express                = require('express');
const router                 = express.Router();
const {stripeCheckout,stripeWebhookCall,getOrder} = require('../Controllers/PaymentController');


/*--------------------------------------------
| Payments routes
---------------------------------------------*/

router.post('/checkout', stripeCheckout);
router.post('/webhook',stripeWebhookCall);
router.post('/get-order', getOrder);


module.exports = router;