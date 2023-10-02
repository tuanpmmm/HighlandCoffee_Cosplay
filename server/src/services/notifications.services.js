const { Notifications } = require('../models');

class NotificationsServices {

    async fncCreateNotification(req) {
        const newNotification = await Notifications.create(req.body);
        return newNotification;
    }

    async fncGetNotificationsByUser (req) {
        const notifications = await Notifications.findAll({
            where: {
                customer_id: req.params.cid
            }
        })
        return notifications;
    }

    async fncSeenNotifications (req) {
        const seen = await Notifications.update({
            is_seen: true
        }, {
            where: {
                is_seen: false,
                customer_id: req.params.cid
            }
        })
        return seen;
    }
}

module.exports = new NotificationsServices;