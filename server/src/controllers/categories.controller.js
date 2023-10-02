const CategoriesServices = require('../services/categories.services')


class CategoriesController {

    async getAllCategories (req, res) {
        const categories = await CategoriesServices.fncGetAllCategories(req);
        if(categories) {
            return res.status(200).json(categories);
        } else {
            return res.json();
        }
    }

    async createCategory (req, res) {
        const newCategory = await CategoriesServices.fncCreateCategory(req);
        if(newCategory) {
            return res.status(200).json(newCategory);
        } else {
            return res.json();
        }
    }

    async getOneCategory(req, res) {
        const category = await CategoriesServices.fncGetOneCategory(req);
        if(category) {
            return res.status(200).json(category);
        } else {
            return res.json();
        }
    }

    async updateCatgory(req, res) {
        const newCategory = await CategoriesServices.fncUpdateCategory(req);
        if(newCategory) {
            return res.status(200).json(newCategory);
        } else {
            return res.json();
        }
    }

}

module.exports = new CategoriesController;