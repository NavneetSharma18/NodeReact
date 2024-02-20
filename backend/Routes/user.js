const express                                = require('express');
const {Index,Register,Login}                 = require('../Controllers/UserController');
const router                                 = express.Router();


/*--------------------------------------------
| Admin dashboard routes
---------------------------------------------*/

router.get('/', Index);
router.post('/register', Register);
router.post('/login', Login);

module.exports = router;