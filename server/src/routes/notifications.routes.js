const express = require('express');
const router = express.Router();
const NotificationsController = require('../controllers/notifications.controller');
const { authAdminMidleware } = require('../middlewares/auth.midlewares');

router.post('/create', authAdminMidleware, NotificationsController.createNotification);
router.get('/get-by-user/:cid', NotificationsController.getNotificationsByUser);
router.put('/seen/:cid', NotificationsController.seenNotifications);

module.exports = router;
