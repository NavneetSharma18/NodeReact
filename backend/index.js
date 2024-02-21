const express        = require('express');
const app            = express();
const cors           = require('cors');
const dotenv         = require('dotenv');
const cookieParser   = require('cookie-parser')
const {VerifyToken}  = require('./Middlewares/VerifyToken');


require('./DB/config');



/*------------------------------------------
| Config the Env variables
--------------------------------------------*/

dotenv.config();
const PORT    = process.env.PORT;

// app.set('json spaces', 2)
// app.use(cors({'origin':'http://localhost:3000','credentials':true}));

// app.use(express.json());
// app.use(cookieParser())

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.use('/user', require('./Routes/user'));
app.use('/product',VerifyToken, require('./Routes/product'));


app.listen(PORT);
console.log('server started at port',PORT)
