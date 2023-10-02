import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector} from '../../redux/selector';

const itemsForUser = [
    {
        key: '/trang-ca-nhan',
        label: 'Thông tin tài khoản'
    },
    {
        key: '/don-hang',
        label: 'Đơn hàng của bạn'
    },
    {
        key: '/doi-mat-khau',
        label: 'Đổi mật khẩu'
    },
    {
        label: 'Đăng xuất'
    }
]

const itemsForAdmin = [
    {
        key: '/admin/tong-quan',
        label: 'Tổng quan'
    },
    {
        key: '/admin/khach-hang',
        label: 'Khách hàng'
    },
    {
        key: '/admin/loai-san-pham',
        label: 'Loại sản phẩm'
    },
    {
        key: '/admin/san-pham',
        label: 'Sản phẩm'
    },
    {
        key: '/admin/lich-su-giao-dich',
        label: 'Lịch sử giao dịch'
    },
    {
        key: '/admin/don-hang-cho-xac-nhan',
        label: 'Đơn hàng chờ xác nhận'
    },
]

const SideBar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector(userSelector);

    return (
        <>
            {
                user.is_admin ? <Menu
                    defaultSelectedKeys={location.pathname}
                    items={itemsForAdmin}
                    onClick={(e) => navigate(e.key)}
                    style={{
                        width: 256,
                      }}
                /> :
                    <Menu
                        defaultSelectedKeys={location.pathname}
                        items={itemsForUser}
                        onClick={(e) => navigate(`${e.key}`)}
                    />
            }
        </>
    );
}

export default SideBar;

