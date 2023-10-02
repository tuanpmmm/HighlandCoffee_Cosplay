const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/customer.controller');
const { authAdminMidleware } = require('../middlewares/auth.midlewares');

router.get('/get-by-email', CustomersController.getUserByEmail);
router.get('/:id', CustomersController.getOne);
router.post('/', authAdminMidleware, CustomersController.getAllCustomers);
router.post('/login', CustomersController.login);
router.put('/change-password/:id', CustomersController.changePassword);
router.put('/forgot-password/:id', CustomersController.forgotPassword);
router.post('/register', CustomersController.register);
router.put('/update/:id', CustomersController.changeProfile);


module.exports = router;