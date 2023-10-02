const OrdersServices = require('../services/orders.services');

class OrdersController {

    async addToOrder(req, res) {
        const orders = await OrdersServices.fncAddToOrder(req);
        if(orders) {
            res.status(200).json(orders);
        } else {
            return res.json();
        }
    }

    async gettAllOrdersWaiting(req, res) {
        const data = await OrdersServices.fncGetAllOrdersWaiting(req);
        return res.status(200).json(data);
    }

    async gettAllOrders(req, res) {
        const data = await OrdersServices.fncGetAllOrder(req);
        return res.status(200).json(data);
    }

    async getOrderByCustomer(req, res) {
        const data = await OrdersServices.fncGetOrdersByCustomer(req);
        return res.status(200).json(data);
    }

    async confirmOrder(req, res) {
        const newOrder = await OrdersServices.fncConfirmOrder(req);
        return res.status(200).json(newOrder);
    }

    async cancelOrder(req, res) {
        const newOrder = await OrdersServices.fncCancelOrder(req);
        return res.status(200).json(newOrder);
    }

    async confirmGetOrder(req, res) {
        const newOrder = await OrdersServices.fncConfirmGetOrder(req);
        return res.status(200).json(newOrder);
    }

}

module.exports = new OrdersController