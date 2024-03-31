const express        = require('express');
const app            = express();
const cors           = require('cors');
const dotenv         = require('dotenv');
const cookieParser   = require('cookie-parser');
const fileUpload     = require('express-fileupload');
const {VerifyToken}  = require('./Middlewares/VerifyToken');


require('./DB/config');

const uploadDir = __dirname;

/*------------------------------------------
| Config the Env variables
--------------------------------------------*/

dotenv.config();
const PORT    = process.env.PORT;

/*------------------------------------------
| Config the Middleware
--------------------------------------------*/
app.use(fileUpload());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

/*------------------------------------------
| Config the Routes
--------------------------------------------*/

app.use('/user', require('./Routes/user'));
app.use('/product',VerifyToken, require('./Routes/product'));
app.use('/payment', require('./Routes/payment'));


/*------------------------------------------
| Config the Server
--------------------------------------------*/

app.listen(PORT);
console.log('server started at port',PORT)
