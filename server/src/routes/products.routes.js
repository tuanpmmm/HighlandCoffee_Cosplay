const express = require('express');
const router = express.Router();
const multer = require('multer');
const ProductsController = require('../controllers/products.controller');
const { authAdminMidleware } = require('../middlewares/auth.midlewares');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })


router.get('/category/:cateid', ProductsController.getByCategoryId);
router.get('/detail/:slug', ProductsController.getOneProduct);
router.post('/', ProductsController.getAllProducts);
router.post('/create', authAdminMidleware, upload.single('upload'), ProductsController.createProduct);
router.put('/update/:slug', authAdminMidleware, upload.single('upload'), ProductsController.updateProduct);
router.put('/delete/:name', authAdminMidleware, ProductsController.deleteProduct);


module.exports = router;