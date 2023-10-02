const { Customers } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const sendMail = require('../utils/send-mail');
const randomCode = require('../utils/random-code');
const { accessToken } = require('./jwt.services');
const { Op } = require("sequelize");

class CustomersServices {

    async fncGetAllCustomers(req) {
        const page = req.body.page;
        let data= {};
        if(!req.body.keyword) {
            data = await Customers.findAndCountAll({
                where: {
                    is_admin: false
                },
                attributes: ['fullname', 'email'],
                limit: parseInt(process.env.LIMIT_CUSTOMER),
                offset: page * parseInt(process.env.LIMIT_CUSTOMER)
            })
        } else {
            data = await Customers.findAndCountAll({
                where: {
                    is_admin: false,
                    fullname: {
                        [Op.substring]: req.body.keyword
                    }
                },
                attributes: ['fullname', 'email'],
                limit: parseInt(process.env.LIMIT_CUSTOMER),
                offset: page * parseInt(process.env.LIMIT_CUSTOMER)
            })
        }
        return data;
    }

    async fncLogin(req) {
        const getCustomer = await Customers.findOne({
            where: {
                email: req.body.email
            }
        })
        if (getCustomer === null) {
            return
        }
        const check = bcrypt.compareSync(req.body.password, getCustomer.password);
        if (check) {
            const access_token = accessToken({
                id: getCustomer.id,
                is_admin: getCustomer.is_admin,
            })
            return access_token;
        }
    }


    async fncRegister(req, res) {
        const { email } = req.body;
        let code = 0;
        const checkEmailExists = await Customers.findOne({
            where: {
                email: req.body.email
            }
        })
        if (checkEmailExists === null) {
            if (!req.body.code) {
                code = randomCode();
                res.cookie('ccrd', bcrypt.hashSync(code.toString(), saltRounds), { maxAge: 36000000 });
                const subject = "Thông tin đăng ký tài khoản tại Highland Coffee";
                const content = `
                <html>
                <head>  
                <style>
                    p {
                        color: #333;
                    }
                </style>
                </head>
                <body>
                    <h3>Chào mừng đến với Highlands Coffee CPG</h3>
                    <p>Cảm ơn Anh/chị đã đăng ký tài khoản tại cửa hàng của chúng tôi.</p>
                    <p>Hãy nhập mã xác thực sau để hoàn tất quá trình đăng ký: ${code}</p>
                </body>
                </html>`
                await sendMail(email, subject, content);
                return 'Đã gửi mail'
            } else {
                if (bcrypt.compareSync(req.body.code, req.cookies.ccrd)) {
                    res.clearCookie('ccrd');
                    const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
                    const hashCustomer = { ...req.body, password: hashPassword };
                    const newCustomer = await Customers.create(hashCustomer);
                    const subject = "Thông tin đăng ký tài khoản tại Highland Coffee";
                    const content = `
                    <html>
                    <head>  
                        <style>
                            p {
                                color: #333;
                            }
                        </style>
                    </head>
                    <body>
                        <h3>Chào mừng đến với Highlands Coffee CPG</h3>
                        <p>Cảm ơn Anh/chị đã đăng ký tài khoản tại cửa hàng của chúng tôi.</p>
                    <p>Anh/chị vui lòng truy cập vào tài khoản theo địa chỉ <a href='http://localhost:3000'>http://localhost:3000</a> để thực hiện đặt hàng và quản lý giao dịch nhanh chóng thuận tiện hơn.</p>
                        </body>
                    </html>`
                    await sendMail(email, subject, content);
                    return newCustomer;
                } else {
                    return
                }
            }
        } else {
            return
        }
    }

    // Change profile
    async fncUpateCustomer(req) {
        const newCustomer = await Customers.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return newCustomer;
    }

    async fncForgotPassword(req) {
        const checkEmailExists = await Customers.findOne({
            where: {
                id: req.params.id
            }
        })
        if (checkEmailExists !== null) {
            const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
            const newCustomer = await Customers.update({
                password: hashPassword
            }, {
                where: {
                    id: checkEmailExists.id
                }
            });
            return newCustomer;
        }
    }

    async fncChangePassword(req) {
        const getCustomer = await Customers.findOne({
            where: {
                id: req.params.id
            }
        })
        const check = bcrypt.compareSync(req.body.oldpassword, getCustomer.password);
        if (check) {
            const hashPassword = bcrypt.hashSync(req.body.newpassword, saltRounds);
            const newCustomer = await Customers.update({
                password: hashPassword
            }, {
                where: {
                    id: getCustomer.id
                }
            });
            return newCustomer;
        }
    }

    async fncGetUserByEmail(req, res) {
        const checkEmailExists = await Customers.findOne({
            where: {
                email: req.query.email
            }
        })
        if (checkEmailExists) {
            res.cookie('usid', `${checkEmailExists.id}${randomCode()}`, { maxAge: 36000000 });
            const subject = "Thiết lập lại mật khẩu tài khoản khách hàng";
            const content = `
            <html>
            <head>
            <style>
                p {
                    color: #333;
                }
            </style>
            </head>
            <body>
              <p>Xin chào ${checkEmailExists.fullname}</p>
              <p>Anh/chị đã yêu cầu đổi mật khẩu tại Highlands Coffee CPG.</p>
              <p> Anh/chị vui lòng truy cập vào liên kết dưới đây để thay đổi mật khẩu của Anh/chị nhé..</p>
              <a href='http://localhost:3000/dat-lai-mat-khau'>Đặt lại mật khẩu</a>
            </body>
            </html>
            `
            await sendMail(req.query.email, subject, content);
            return checkEmailExists;
        }
    }


    async fncGetOne(req) {
        const customer = await Customers.findOne({
            where: {
                id: req.params.id
            },
        })
        return customer;
    }


}

module.exports = new CustomersServices;