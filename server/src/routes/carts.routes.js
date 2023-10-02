const express = require('express');
const router = express.Router();
const CartsController = require('../controllers/carts.controller');


router.post('/add-to-carts', CartsController.addToCart);
router.delete('/remove-to-carts/:pid', CartsController.removeToCart);
router.get('/remove-carts', CartsController.removeAllCart);
router.get('/up-quantity/:pid', CartsController.upQuantity);
router.get('/down-quantity/:pid', CartsController.downQuantity);
router.get('/get-carts', CartsController.getAllCarts);

module.exports = router;
