const { Products } = require('../models');

class CartsController {

    async addToCart(req, res) {
        const { product_id, quantity, price, image, name } = req.body;
        const carts = req.cookies.cart || [];
        let check = false;
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].product_id === product_id) {
                carts[i] = { product_id, quantity: carts[i].quantity + quantity, price: carts[i].price + price, image: image, name: name };
                check = true;
                break;
            }
        }
        if(!check) {
            carts.push({ product_id, quantity, price, image, name });
        }
        res.cookie('cart', carts, { maxAge: 3600000 });
        res.json(carts);
    }

    async removeToCart(req, res) {
        const pid = req.params.pid;
        const carts = req.cookies.cart;
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].product_id == pid) {
                carts.splice(i, 1);
            }
        }
        res.cookie('cart', carts, { maxAge: 3600000 });
        res.json({Message: 'Xoa thanh cong'});
    }

    async downQuantity(req, res) {
        const pid = req.params.pid;
        const product = await Products.findOne({
            where: {
                id: pid
            }
        })
        const carts = req.cookies.cart;
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].product_id == pid) {
                carts[i].quantity = carts[i].quantity - 1;
                carts[i].price = carts[i].price - product.price;
            }
        }
        res.cookie('cart', carts, { maxAge: 3600000 });
        res.json({Message: 'Xoa thanh cong'});
    }

    async upQuantity(req, res) {
        const pid = req.params.pid;
        const product = await Products.findOne({
            where: {
                id: pid
            }
        })
        const carts = req.cookies.cart;
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].product_id == pid) {
                carts[i].quantity = carts[i].quantity + 1;
                carts[i].price = carts[i].price + product.price;
            }
        }
        res.cookie('cart', carts, { maxAge: 3600000 });
        res.json({Message: 'Xoa thanh cong'});
    }

    async getAllCarts(req, res) {
        const carts = req.cookies.cart || [];
        return res.status(200).json(carts)
    }

    async removeAllCart(req, res) {
        res.clearCookie('cart');
        console.log('abc');
        return res.json({Message: 'Xoa tat ca thanh cong'})
    }
}

module.exports = new CartsController