const express                             = require('express');
const {createPaymentIntent} = require('../Controllers/PaymentController');
const router                              = express.Router();


/*--------------------------------------------
| Payments routes
---------------------------------------------*/

router.post('/create-pi', createPaymentIntent);

module.exports = router;