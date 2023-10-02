const CustomersServices = require('../services/customers.services')

class CustomersController {

    async getAllCustomers(req, res) {
        const data = await CustomersServices.fncGetAllCustomers(req);
        if(data) {
            return res.status(200).json(data);
        } else {
            return res.json();
        }
    }

    async login(req, res) {
        const token = await CustomersServices.fncLogin(req);
        if(token) {
            return res.status(200).json(token);
        } else {
            return res.json();
        }
    }

    async register(req, res) {
        const newCustomer = await CustomersServices.fncRegister(req, res);
        if(newCustomer) {
            return res.status(200).json(newCustomer);
        } else {
            return res.json();
        }
    }

    async forgotPassword(req, res) {
        const newCustomer = await CustomersServices.fncForgotPassword(req);
        if (newCustomer) {
            return res.status(200).json(newCustomer);
        } else {
            return res.json();
        }
    }

    async changePassword(req, res) {
        const newCustomer = await CustomersServices.fncChangePassword(req);
        if (newCustomer) {
            return res.status(200).json(newCustomer);
        } else {
            return res.json();
        }
    }

    async getUserByEmail (req, res) {
        const customer = await CustomersServices.fncGetUserByEmail(req, res);
        if(customer) {
            return res.status(200).json(customer);
        } else {
            return res.json();
        }
    }


    async getOne(req, res) {
        const customer = await CustomersServices.fncGetOne(req);
        return res.status(200).json(customer);
    }

    async changeProfile(req, res) {
        const newCustomer = await CustomersServices.fncUpateCustomer(req);
        return res.status(200).json(newCustomer)
    }
}

module.exports = new CustomersController