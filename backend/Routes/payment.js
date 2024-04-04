const express                = require('express');
const router                 = express.Router();
const {stripeCheckout,stripeWebhookCall} = require('../Controllers/PaymentController');


/*--------------------------------------------
| Payments routes
---------------------------------------------*/

router.post('/checkout', stripeCheckout);
router.post('/webhook', stripeWebhookCall);


module.exports = router;