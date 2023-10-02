const { Products, Categories } = require('../models');
const { Op } = require("sequelize");
const formatSlug = require('../utils/format-slug');


class ProductsServices {


    async fncGetAllProducts(req) {
        const { page, cateSlug, keyword } = req.body;
        let data = {};
        if (!page) {
            data = await Products.findAll({
                where: {
                    is_deleted: false
                },
            })
        } else {
            if (keyword && !cateSlug) {
                data = await Products.findAndCountAll({
                    where: {
                        is_deleted: false,
                        name: {
                            [Op.substring]: keyword
                        }
                    },
                    limit: parseInt(process.env.LIMIT_PRODUCT),
                    offset: page * parseInt(process.env.LIMIT_PRODUCT),
                })
            } else if (!keyword && cateSlug) {
                const category = await Categories.findOne({
                    where: {
                        slug: cateSlug
                    }
                })
                if (!category) return;
                data = await Products.findAndCountAll({
                    where: {
                        is_deleted: false,
                        category_id: category.id
                    },
                    limit: parseInt(process.env.LIMIT_PRODUCT),
                    offset: page * parseInt(process.env.LIMIT_PRODUCT),
                })
            }
        }
        return data;

    }

    // Detail
    async fncGetOneProduct(req) {
        const slug = req.params.slug;
        const product = await Products.findOne({
            where: {
                slug: slug
            }
        })
        return product;
    }

    async fncGetByCategoryId(req) {
        const cateid = req.params.cateid;
        const products = await Products.findAll({
            where: {
                category_id: cateid,
                is_deleted: false
            }
        })
        return products;
    }
    

    // Thêm product
    async fncCreateProduct(req) {
        const slug = formatSlug(req.body.name);
        const products = await Products.findOne({
            where: {
                slug: slug
            }
        });
        if (products) return;
        const newProduct = await Products.create({ ...req.body, image: req.file.path, slug });
        return newProduct;
    }

    // Update product
    async fncUpdateProduct(req) {
        const slug = req.params.slug;
        let newProduct = 0;
        if (req.file) {
            newProduct = await Products.update({ ...req.body, image: req.file.path }, {
                where: {
                    slug: slug
                }
            });
        } else {
            newProduct = await Products.update({ ...req.body }, {
                where: {
                    slug: slug
                }
            });
        }
        return newProduct;
    }

    //Delete product (soft delete)
    async fncDeleteProduct(req) {
        const id = req.params.id;
        const newProduct = await Products.update({
            is_deleted: true
        }, {
            where: {
                id: id
            }
        })
        return newProduct;
    }
}

module.exports = new ProductsServices