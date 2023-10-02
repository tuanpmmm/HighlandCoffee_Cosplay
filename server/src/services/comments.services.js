const { Comments, Customers } = require('../models');

class CommentsServices {

    // create comment
    async fncSendComment (req) {
        const newComment = await Comments.create(req.body);
        return newComment;
    }

    // get all comment
    async fncGetAllComment (req) {
        const comments = await Comments.findAll({
            where: {
                product_id: req.params.pid
            },
            include: {
                model: Customers,
                attributes: ['fullname'],
            }
        })
        return comments;
    }

    // edit comment
    async fncEditComment (req) {
        const newComment = await Comments.update({
            text: req.body.comment
        }, {
            where: {
                id: req.body.id
            }
        })
        return newComment;
    }

    // delete comment
    async fncDeleteComment (req) {
        const deleteComment = await Comments.destroy({
            where: {
                id: req.params.id
            }
        })
        return deleteComment;
    }

}

module.exports = new CommentsServices;
