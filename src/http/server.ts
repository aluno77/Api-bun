import { Elysia } from 'elysia'

import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

import { authenticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'
import { getProfile } from './routes/get-profile'
import { getManagedRestaurant } from './routes/get-managed-restaurant'
import { getOrderDetails } from './routes/get-order-details'
import { approveOrder } from './routes/approve-order'
import { dispatchOrder } from './routes/dispatch-order'
import { cancelOrder } from './routes/cancel-order'
import { deliverOrder } from './routes/deliver-order'
import { getOrders } from './routes/get-orders'
import { getMonthReceipt } from './routes/get-month-receipt'
import { getDayOrderMonth } from './routes/get-Day-Orders-Amount'
import { getMonthOrderAmount } from './routes/get-Month-Orders-Amount'
import { getMonthCanceledOrderAmount } from './routes/get-month-canceled-orders-amount'
import { getPopularProducts } from './routes/get-popular-products'
import { getDailyReceiptInPeriod } from './routes/get-daily-receipt-in-period'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .use(getOrderDetails)
  .use(approveOrder)
  .use(deliverOrder)
  .use(dispatchOrder)
  .use(cancelOrder)
  .use(getOrders)
  .use(getMonthReceipt)
  .use(getDayOrderMonth)
  .use(getMonthOrderAmount)
  .use(getMonthCanceledOrderAmount)
  .use(getPopularProducts)
  .use(getDailyReceiptInPeriod)
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return error.toResponse()
      }
      case 'NOT_FOUND': {
        return new Response(null, { status: 404 })
      }
      default: {
        console.error(error)

        return new Response(null, { status: 500 })
      }
    }
  })
// todo: error handling global
app.listen(3333, () => {
  console.log('svr run on port 3333')
})
