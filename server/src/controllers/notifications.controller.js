const NotificationsServices = require('../services/notifications.services');

class NotificationsController {

    async createNotification(req, res) {
        const newNotification = await NotificationsServices.fncCreateNotification(req);
        return res.status(200).json(newNotification);
    }

    async getNotificationsByUser (req, res) {
        const notifications = await NotificationsServices.fncGetNotificationsByUser(req);
        return res.status(200).json(notifications);
    }

    async seenNotifications (req) {
        const seen = await NotificationsServices.fncSeenNotifications(req);
        return res.status(200).json(seen);
    }

}

module.exports = new NotificationsController;