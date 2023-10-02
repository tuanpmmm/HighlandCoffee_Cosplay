import LayoutUser from "../../components/Layouts/LayoutUser";
import Login from "../../components/Login/Login";
import BreadCrumbCustom from "../../components/MyBreadCrumb/BreadCrumbCustom";

const LoginPage = () => {

    
    return (
        <LayoutUser>
            <BreadCrumbCustom title='Đăng nhập' path='/dang-nhap' />
            <Login />
        </LayoutUser>
    );
}
 
export default LoginPage;