# Stripe Test Mode CMD
  stripe listen --forward-to localhost:2000/payment/webhook/

# Listen Payment Event
 stripe trigger payment_intent.succeeded
