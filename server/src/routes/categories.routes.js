const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories.controller');
const { authAdminMidleware } = require('../middlewares/auth.midlewares');


router.get('/detail/:slug', authAdminMidleware, CategoriesController.getOneCategory);
router.post('/', CategoriesController.getAllCategories);
router.put('/update/:slug', authAdminMidleware, CategoriesController.updateCatgory);
router.post('/create', authAdminMidleware, CategoriesController.createCategory);

module.exports = router;