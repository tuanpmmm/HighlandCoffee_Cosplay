const CommentsServices = require('../services/comments.services');

class CommentsController {

    async sendComment(req, res) {
        const newComment = await CommentsServices.fncSendComment(req);
        return res.status(200).json(newComment);
    }

    async getAllComment(req, res) {
        const comments = await CommentsServices.fncGetAllComment(req);
        if(comments) {
            return res.status(200).json(comments);
        } else {
            return res.json();
        }
    }

    async editComment(req, res) {
        const newComment = await CommentsServices.fncEditComment(req);
        return res.status(200).json(newComment);
    }

    async deleteComment(req, res) {
        const comment = await CommentsServices.fncDeleteComment(req);
        return res.status(200).json(comment);
    }

}


module.exports = new CommentsController;
