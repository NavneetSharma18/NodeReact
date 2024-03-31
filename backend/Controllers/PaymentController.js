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

            const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
            const total  = data.total;
            const email  = data.email;
            
            try{
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: total,
                    currency: 'usd',
                    //customer:email,
                    automatic_payment_methods: {
                        enabled: true,
                    },
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