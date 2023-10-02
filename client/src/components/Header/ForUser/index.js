import React, { useEffect, useState } from 'react';
import { Row, Col, Dropdown, AutoComplete, Input, Badge, Button, Popover, Space } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, MenuOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';

import { HeaderContainer, HeaderSize, Logo, StyledLink, MenuItemText, ButtonSearch } from "./styled";

// import { userSelector } from '../../redux/selector';
// import { useDispatch, useSelector } from 'react-redux';
// import globalSlice from '../../redux/globalSlice';
// import { getAllCarts } from '../../services/cart.services';
// import { globalSelector } from '../../redux/selector';



const items = [
    {
        label: <a href="http://localhost:3000/" style={{ padding: '0 100px 30px 0', fontSize: '16px', fontFamily: 'sans-serif' }}>Trang chủ</a>,
        key: '0',
    },
    {
        label: <a href="http://localhost:3000/" style={{ padding: '0 100px 30px 0', fontSize: '16px', fontFamily: 'sans-serif' }}>Flash Sale</a>,
        key: '1',
    },
    {
        label: <a href="http://localhost:3000/" style={{ padding: '0 100px 30px 0', fontSize: '16px', fontFamily: 'sans-serif' }}>Sản phẩm</a>,
        key: '2',
    },
    {
        label: <a href="http://localhost:3000/gioi-thieu" style={{ padding: '0 100px 30px 0', fontSize: '16px', fontFamily: 'sans-serif' }}>Giới thiệu</a>,
        key: '3',
    },
    {
        type: 'divider',
    },
    {
        label: 'Bạn cần hỗ trợ?',
    },
    {
        type: 'divider',
    },
    {
        label: '+84123456789',
    },
    {
        label: 'abc@gmail.com',
    },
];

const contentHeaderSearch = (
    <AutoComplete
        popupClassName="certain-category-search-dropdown"
        style={{
            width: '90%',
            margin: 'auto'
        }}
    >
        <Input.Search
            // onSearch={handleSearch} 
            size="large" placeholder="Tìm sản phẳm..." />
    </AutoComplete>
)


const HeaderHome = () => {

    // const [quantity, setQuantity] = useState();
    // const dispatch = useDispatch();
    // const user = useSelector(userSelector);
    // const navigate = useNavigate();
    // const global = useSelector(globalSelector);

    // useEffect(() => {
    //     const getCarts = async () => {
    //         const res = await getAllCarts();
    //         const total = res.data.reduce((t, p) => {
    //             return t + p.quantity
    //         }, 0)
    //         setQuantity(total)
    //     }
    //     getCarts();
    // }, [global.reRender])

    // const handleSearch = (e) => {
    //     dispatch(globalSlice.actions.changePage(0));
    //     navigate(`/search?query=${e}`);
    // }





    return (
        <div>
            <HeaderContainer>
                <HeaderSize>
                    <Row justify="space-between" align="middle" maxWidth="80%" >
                        <Col xl={2} lg={2} md={2} sm={2} xs={2} style={{ display: 'grid' }}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomLeft"
                                trigger={['click']}
                            >
                                <Space style={{ display: 'grid', cursor: 'pointer' }}>
                                    <MenuOutlined style={{ paddingLeft: '10px', fontSize: '16px' }} />
                                    <span style={{ color: 'while', fontSize: '14px' }}>Menu</span>
                                </Space>
                            </Dropdown>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={3} xs={3} >
                            <Link to="/">
                                <Logo src="https://bizweb.dktcdn.net/100/465/740/themes/884110/assets/logo.png?1693532040126" alt="Logo" />
                            </Link>
                        </Col>
                        <Col xl={14} lg={14} md={14} sm={0} xs={0}>
                            <AutoComplete
                                popupClassName="certain-category-search-dropdown"
                                style={{
                                    width: '90%',
                                    margin: 'auto'
                                }}
                            >
                                <Input.Search
                                    // onSearch={handleSearch} 
                                    size="large" placeholder="Tìm sản phẳm..." />
                            </AutoComplete>
                        </Col>
                        <Col xl={0} lg={0} md={0} sm={14} xs={14}>
                            <Popover placement="leftTop" content={contentHeaderSearch} trigger="click">
                                <ButtonSearch><SearchOutlined style={{}} /></ButtonSearch>
                            </Popover>
                        </Col>
                        <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                    {/* {user.name === '' ? <StyledLink to="/dang-nhap">Tài khoản</StyledLink> : <StyledLink to="/trang-ca-nhan">{user.name}</StyledLink>} */}
                                    <StyledLink md={0} to="/dang-nhap">
                                        <UserOutlined style={{fontSize:'25px'}}/>
                                        <MenuItemText>Tài khoản</MenuItemText>
                                    </StyledLink>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <StyledLink to="/gio-hang">
                                        <Badge
                                            count={0} 
                                            showZero>
                                            <ShoppingCartOutlined style={{ color: "white", fontSize: '25px'}} />
                                        </Badge>
                                        <MenuItemText>Giỏ hàng</MenuItemText>
                                    </StyledLink>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </HeaderSize>
            </HeaderContainer>

        </div>

    );
}

export default HeaderHome;