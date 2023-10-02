const { Categories } = require('../models');
const formatSlug = require('../utils/format-slug');
const { Op } = require("sequelize");


class CategoriesServices {

    async fncGetAllCategories(req) {
        const { page, keyword } = req.body;
        const data = await Categories.findAndCountAll({
            where: {
                name: {
                    [Op.substring]: keyword
                }
            },
            attributes: ['slug', 'name'],
            limit: parseInt(process.env.LIMIT_CATEGORY),
            offset: page * parseInt(process.env.LIMIT_CATEGORY),
        });
        return data;
    }

    async fncCreateCategory(req) {
        const slug = formatSlug(req.body.name);
        const category = await Categories.findOne({
            where: {
                slug: slug
            }
        });
        if (category) return;
        const newCategory = await Categories.create({ ...req.body, slug });
        return newCategory;
    }


    async fncGetOneCategory(req) {
        const slug = req.params.slug;
        const category = await Categories.findOne({
            where: {
                slug: slug
            }
        })
        return category;
    }

    async fncUpdateCategory(req) {
        const slug = req.params.slug;
        const newCategory = await Categories.update({
            name: req.body.name,
            slug: formatSlug(req.body.name)
        }, {
            where: {
                slug: slug
            }
        });
        return newCategory;
    }

}

module.exports = new CategoriesServices;