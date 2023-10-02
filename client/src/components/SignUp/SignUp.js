import React, { useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { LoginContainer, LoginSize, LoginContent, LoginImage, LoginTitle, LoginIcon, LoginMenu, LoginItem } from "./styled"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';


const SignUp = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [checkCode, setCheckCode] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        const checkMail = await register(values);
        if (checkMail.data && !values.code) {
            toast.success('Mã xác nhận đã được gửi về mail của bạn');
            setCheckCode(!checkCode);
        } else if (checkMail.data && values.code) {
            toast.success('Đăng ký thành công');
            navigate('/dang-nhap');
        } else if (!checkMail.data && values.code) {
            toast.error('Bạn nhập sai mã code. Hãy kiểm tra lại');
        } else if (!checkMail.data && !values.code) {
            toast.error('Email đã tồn tại')
        }
        setLoading(false);
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <LoginContainer>
            <LoginSize>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col xl={12} lg={12}  md={12} sm={0} xs={0} >
                        <LoginImage src="https://i.pinimg.com/564x/cf/d8/22/cfd822c39a11551624b5bf3e4112f1dd.jpg" alt="Image" />
                        <LoginTitle>QUYỀN LỢI THÀNH VIÊN</LoginTitle>
                        <LoginIcon>
                            <CheckCircleTwoTone />
                            <LoginContent>Mua hàng khắp thế giới cực dễ dàng, nhanh chóng</LoginContent>
                        </LoginIcon>
                        <LoginIcon>
                            <CheckCircleTwoTone />
                            <LoginContent>Theo dõi chi tiết đơn hàng, địa chỉ thanh toán dễ dàng</LoginContent>
                        </LoginIcon>
                        <LoginIcon>
                            <CheckCircleTwoTone />
                            <LoginContent>Nhận nhiều chương trình ưu đãi hấp dẫn từ chúng tôi</LoginContent>
                        </LoginIcon>
                    </Col>
                    <Col xl={12} lg={12}  md={12} sm={24} xs={24} >
                        <LoginMenu mode="horizontal">
                            <LoginItem key="login">
                                <Link to="/dang-nhap">Đăng nhập</Link>
                            </LoginItem>
                            <LoginItem key="signup">
                                <Link to="/dang-ky">Đăng ký</Link>
                            </LoginItem>
                        </LoginMenu>
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            initialValues={{
                                prefix: '84',
                            }}
                            style={{
                                maxWidth: '350px',
                            }}
                            scrollToFirstError
                        >
                            <div style={!checkCode ? { display: 'block' } : { display: 'none' }}>
                                <Form.Item
                                    name="fullname"
                                    label="Họ tên"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Full Name!',
                                            whitespace: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>
                            </div>
                            {
                                checkCode ?
                                    <Form.Item
                                        name="code"
                                        label="Code"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your code',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item> :
                                    ''
                            }
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#b5313a', padding: '0 90px' }}>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </LoginSize>
        </LoginContainer>
    );
}

export default SignUp;