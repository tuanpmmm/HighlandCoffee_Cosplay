const { Orders, Products, Customers } = require('../models');
const { Op } = require("sequelize");

class OrdersServices {

    async fncAddToOrder(req) {
        const customerId = req.params.customerId;
        const carts = req.cookies.cart || [];
        const createOrderPromises = carts.map(async cart => {
            return Orders.create({
                customer_id: customerId,
                product_id: cart.product_id,
                quantity: cart.quantity,
                price: cart.price
            });
        });
        return await Promise.all(createOrderPromises);
    }

    async fncGetAllOrdersWaiting(req) {
        const page = req.query.page;
        const data = await Orders.findAndCountAll({
            where: {
                status: {
                    [Op.substring]: 'Chờ xác nhận'
                }   
            },
            attributes: ['id', 'quantity', 'price', 'status'],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name', 'image'],
                },
                {
                    model: Customers,
                    attributes: ['fullname'],
                }
            ],
            limit: parseInt(process.env.LIMIT_ORDER),
            offset: page * parseInt(process.env.LIMIT_ORDER)
        });
        return data
    }

    async fncGetAllOrder(req) {
        const page = req.query.page;
        const data = await Orders.findAndCountAll({
            where: {
                status: {
                    [Op.notLike]: 'Chờ xác nhận'
                }
            },
            attributes: ['quantity', 'price', 'status'],
            include: [
                {
                    model: Products,
                    attributes: ['name', 'image'],
                },
                {
                    model: Customers,
                    attributes: ['fullname'],
                }
            ],
            limit: parseInt(process.env.LIMIT_ORDER),
            offset: page * parseInt(process.env.LIMIT_ORDER)
        });
        return data
    }

    async fncGetOrdersByCustomer(req) {
        const { page, customerId } = req.query
        const data = await Orders.findAndCountAll({
            where: {
                customer_id: customerId
            },
            attributes: ['id', 'quantity', 'price', 'status', 'customer_id'],
            include:
            {
                model: Products,
                attributes: ['id', 'name', 'image'],
            },
            limit: parseInt(process.env.LIMIT_ORDER),
            offset: page * parseInt(process.env.LIMIT_ORDER)
        })
        return data;
    }

    async fncConfirmOrder(req) {
        const id = req.query.id;
        const product_id = req.query.product_id;
        const product = await Products.findOne({
            where: {
                id: product_id
            }
        })
        const order = await Orders.findOne({
            where: {
                id: id
            }
        })
        if (product.quantity > order.quantity) {
            await Products.update({
                quantity: Products.sequelize.literal(`quantity - ${order.quantity}`)
            }, {
                where: {
                    id: product_id
                }
            })
            return await Orders.update({
                status: 'Chờ lấy hàng',
            }, {
                where: {
                    id: id
                }
            })
        } else {
            return await Orders.update({
                status: 'Số lượng sản phẩm không đủ để đáp ứng yêu cầu của quý khách',
            }, {
                where: {
                    id: id
                }
            })
        }
    }

    async fncCancelOrder(req) {
        const id = req.query.id;
        const product_id = req.query.product_id;
        const order = await Orders.findOne({
            where: {
                id: id
            }
        })
        await Products.update({
            quantity: Products.sequelize.literal(`quantity + ${order.quantity}`)
        }, {
            where: {
                id: product_id
            }
        })
        return await Orders.update({
            status: 'Hủy đơn hàng',
        }, {
            where: {
                id: id
            }
        })
    }

    async fncConfirmGetOrder(req) {
        const id = req.params.id;
        return await Orders.update({
            status: 'Đã nhận được hàng',
        }, {
            where: {
                id: id
            }
        })
    }

}

module.exports = new OrdersServices;