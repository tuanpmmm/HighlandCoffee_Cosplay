const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');

router.post('/send', commentsController.sendComment);
router.get('/get-all/:pid', commentsController.getAllComment);
router.put('/edit/:id', commentsController.editComment);


module.exports = router;