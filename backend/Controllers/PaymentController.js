const ProductModel = require('../DB/product');
const { PROJECT_DIR, UPLOAD_FOLDER } = require('../setting.js');

/*--------------------------------------------
| Index Routes
---------------------------------------------*/


const createPaymentIntent = async (req, res) => {
    try {

        const data = req.body;
        
        if (!data.total) {

            res.json({ 'status': false, 'msg': "Amount can't ba blank" });

        } else if (!data.email) {

            res.json({ 'status': false, 'msg': "Email can't be balnk" });

        } else {

            const stripe = require('stripe')('sk_test_gpLn1vbkQPRgvXfh1KbjX5ms00Smx29t19');
            const total  = data.total;
            const email  = data.email;
            
            try{
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: parseFloat(total)*100,
                    currency: 'inr',
                    description: 'Software development services',
                    //customer:email
                    });
                    res.json({ 'status': true, 'msg': 'Payment Intent created successfully!','pi':paymentIntent });
        
            }catch(e){
                res.json({ 'status': false, 'msg': 'pi error '+e });
            }
            

        }

    } catch (err) {
        res.json({ 'status': false, 'msg': 'main error '+err });
    }

}




module.exports = {
    createPaymentIntent,
};