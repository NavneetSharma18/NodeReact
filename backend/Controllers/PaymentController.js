const ProductModel = require('../DB/product');
const { PROJECT_DIR, UPLOAD_FOLDER } = require('../setting.js');
const dotenv = require('dotenv');


dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL;
const BASE_URL = process.env.BASE_URL;

/*--------------------------------------------
| Index Routes
---------------------------------------------*/


const stripeCheckout = async (req, res) => {
    try {
        const stripe = require('stripe')('sk_test_gpLn1vbkQPRgvXfh1KbjX5ms00Smx29t19');


        const cartItems = req.body.cartItems;
        const line_items = cartItems.map(item => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.product_title,
                        images: [BASE_URL + item.product_image],
                        description: item.product_description,
                        metadata: {
                            id: item._id
                        }
                    },
                    unit_amount: item.product_price * 100

                },
                quantity: item.qty
            }
        });


        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
            phone_number_collection: {
                enabled: true,
            },
            line_items,
            mode: 'payment',
            success_url: `${CLIENT_URL}/checkout-success`,
            cancel_url: `${CLIENT_URL}/checkout-cancel`,
        });

        res.json({ 'status': true, 'msg': session.url });


    } catch (error) {

        let message = '';
        switch (error.type) {
            case 'StripeCardError':
                message = `A payment error occurred: ${error.message}`;
                break;
            case 'StripeInvalidRequestError':

                if (error.param) {
                    message = `The parameter ${error.param} is invalid or missing.`;
                }
                break;
            default:
                message = 'Another problem occurred, maybe unrelated to Stripe.';
                break;
        }
        res.json({ 'status': false, 'msg': message });
    }


}




module.exports = {
    stripeCheckout,
};