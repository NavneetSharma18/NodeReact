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
        const order_id   = Math.random().toString(36).slice(2)
        const line_items = cartItems.map(item => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.product_title,
                        images: [BASE_URL + item.product_image],
                        description: item.product_description,
                        metadata: {
                            id: item._id,
                            order_id:order_id
                        }
                    },
                    unit_amount: item.product_price * 100

                },
                quantity: item.qty
            }
        });

        
    
        const customer = await stripe.customers.create({
            metadata: {
                userId: loginUserId,
                //cartItems: JSON.stringify(metadata)
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
            success_url: `${CLIENT_URL}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
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
    const sessionId = data.id;
    // get LinItems details
    const productData = await stripe.checkout.sessions.retrieve(
        sessionId, {
        expand: ['line_items']
      });
      
    const items =  productData.line_items.data;

    const newOrder = new OrderModel({
        stripe_checkout_session_id:sessionId,
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



/*-----------------------------------------------------------------------
| GET ORDER BY CHECKOUT SESSION ID
-------------------------------------------------------------------------*/


const getOrder = async(req, res) => {

    const OrderData   = await OrderModel.find({ "stripe_checkout_session_id": req.body.sessionId });
    const orderDetail = OrderData[0];
    res.json({ 'status': true,'orderData':orderDetail });
}



module.exports = {
    stripeCheckout,
    stripeWebhookCall,
    getOrder,
};