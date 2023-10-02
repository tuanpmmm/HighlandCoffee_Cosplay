const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders.controller');
const { authAdminMidleware } = require('../middlewares/auth.midlewares');

router.get('/pay/:customerId', OrdersController.addToOrder); 
router.get('/admin/waiting', authAdminMidleware, OrdersController.gettAllOrdersWaiting)
router.get('/admin', authAdminMidleware, OrdersController.gettAllOrders)
router.get('/customer', OrdersController.getOrderByCustomer);
router.get('/confirm-getorder/:id', OrdersController.confirmGetOrder);
router.get('/confirm-order', authAdminMidleware, OrdersController.confirmOrder);
router.get('/cancel-order', OrdersController.cancelOrder);



module.exports = router;