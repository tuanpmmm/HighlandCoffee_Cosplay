import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom'
import { BreadcrumbContainer, BreadcrumbItem } from './styled';

const BreadCrumbCustom = ({ title }) => {

    const navigate = useNavigate();

    return (
        <BreadcrumbContainer>
            <Breadcrumb>
                <BreadcrumbItem onClick={() => navigate('/')}>
                    Trang chủ
                </BreadcrumbItem>
                <Breadcrumb.Item>
                    {title}
                </Breadcrumb.Item>
            </Breadcrumb>
        </BreadcrumbContainer>
    );
}

export default BreadCrumbCustom;