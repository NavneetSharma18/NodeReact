const ProductModel = require('../DB/product');
const OrderModel = require('../DB/order');
const { PROJECT_DIR, UPLOAD_FOLDER } = require('../setting.js');
const dotenv = require('dotenv');


dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL;
const BASE_URL = process.env.BASE_URL;

const stripe = require('stripe')('sk_test_gpLn1vbkQPRgvXfh1KbjX5ms00Smx29t19');



/*--------------------------------------------
| STRIPE DASHBOARD CHECKOUT
---------------------------------------------*/


const stripeCheckout = async (req, res) => {
    try {

        const cartItems = req.body.cartItems;
        const dummyId = Math.floor(Math.random() * 90) + 10;
        const loginUserId = (req.body.loginUserId) ? req.body.loginUserId : dummyId;


        // Create Stripe Checkout item list

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

        // Create Customeron Stripe

        const metadata = cartItems.map(item => {
            return {

                name: item.product_title,
                images: BASE_URL + item.product_image,
                product_id: item._id

            }
        });
    
        const customer = await stripe.customers.create({
            metadata: {
                userId: loginUserId,
                cartItems: JSON.stringify(metadata)
            }
        });

        // Create Stripe Session Checkout

        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
            phone_number_collection: {
                enabled: true,
            },
            customer: customer.id,
            line_items,
            mode: 'payment',
            success_url: `${CLIENT_URL}/thankyou`,
            cancel_url: `${CLIENT_URL}/shop`,
        });

        res.json({ 'status': true, 'msg': session.url });


    } catch (error) {

        let message = error.message;
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

/*---------------------------------------------------------------------
| CREATE ORDER AND SAVE IN MONGO DB
----------------------------------------------------------------------*/

const createOrder = async (customer, data) => {
    const items = JSON.parse(customer.metadata.cartItems);
    const newOrder = new OrderModel({
        user_id: customer.metadata.userId,
        customer_id: data.customer,
        payment_intent_id: data.payment_intent_id,
        products: items,
        sub_total: ((data.amount_subtotal) / 100),
        total: ((data.amount_total) / 100),
        shipping_address: data.customer_details,
        billing_address: data.customer_details,
        payment_status: data.payment_status,

    });

    try {
        const orderId = await newOrder.save();
        console.log('Order placed order id is ' + orderId)
    } catch (err) {
        console.log('ERROR in order creation ' + err.message)
    }

}

/*-----------------------------------------------------------------------
| WEBHOOK CALL FOR PAYMENT RESPONSE
-------------------------------------------------------------------------*/

const endpointSecret = "whsec_075c922c1898ab8cae6c67e490d5c77e849965b29750c7cd59b5bad0157d383e";

const stripeWebhookCall = (req, res) => {

    const sig = req.headers['stripe-signature'];

    let event_type;
    const data = req.body.data.object;

    try {
        event_type = req.body.type; //stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {

        console.log(`Webhook Error: ${err.message}`);

    }

    // Handle the event
    switch (event_type) {
        case 'checkout.session.completed':

            stripe.customers.retrieve(data.customer).then((customer) => {
                createOrder(customer, data);
            }).catch((err) => {
                console.log('error customer retrieve ' + err.message);
            })

            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event_type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();

}



module.exports = {
    stripeCheckout,
    stripeWebhookCall,
};