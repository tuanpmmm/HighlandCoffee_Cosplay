import { useNavigate } from 'react-router-dom';
import SideBar from '../../Sidebar';
import { Row, Col, AutoComplete, Input } from 'antd';
import HeaderAdmin from '../../Header/ForAdmin';

const LayoutAdmin = ({ children }) => {

    const navigate = useNavigate();

    return (
        <>
            <div>
                <HeaderAdmin />
            </div>
            <Row>
                <Col span={8}>
                    <SideBar />
                </Col>
                <Col span={14}>
                    {children}
                </Col>
            </Row>
        </>
    );
}

export default LayoutAdmin;