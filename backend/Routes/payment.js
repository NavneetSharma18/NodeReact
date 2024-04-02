const express                = require('express');
const {stripeCheckout}       = require('../Controllers/PaymentController');
const router                 = express.Router();


/*--------------------------------------------
| Payments routes
---------------------------------------------*/

router.post('/checkout', stripeCheckout);

module.exports = router;