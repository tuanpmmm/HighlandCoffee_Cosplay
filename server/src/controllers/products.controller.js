const ProductsServices = require('../services/products.services')

class ProductsController {


    async getAllProducts (req, res) {
        const data = await ProductsServices.fncGetAllProducts(req);
        if(data) {
            return res.status(200).json(data);
        } else {
            return res.json();
        }
    }

    async getOneProduct (req, res) {
        const product = await ProductsServices.fncGetOneProduct(req);
        if(product) {
            return res.status(200).json(product);
        } else {
            return res.json();
        }
    }

    async getByCategoryId(req, res) {
        const products = await ProductsServices.fncGetByCategoryId(req);
        if(products) {
            return res.status(200).json(products);
        } else {
            return res.json();
        }
    }

    async createProduct (req, res) {
        const newProduct = await ProductsServices.fncCreateProduct(req);
        if(newProduct) {
            return res.status(200).json(newProduct);
        } else {
            return res.json();
        }
    }

    // Update product
    async updateProduct (req, res) {
        const newProduct = await ProductsServices.fncUpdateProduct(req);
        if(newProduct) {
            return res.status(200).json(newProduct);
        } else {
            return res.json();
        }
    }

    //Delete product (soft delete)
    async deleteProduct (req, res) {
        const newProduct = await ProductsServices.fncDeleteProduct(req);
        return res.status(200).json(newProduct);
    }
    
}

module.exports = new ProductsController;