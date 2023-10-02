import LayoutUser from "../../components/Layouts/LayoutUser";
import BreadCrumbCustom from "../../components/MyBreadCrumb/BreadCrumbCustom";
import SignUp from "../../components/SignUp/SignUp";

const SignupPage = () => {
    return (
        <LayoutUser>
            <BreadCrumbCustom title='Đăng ký' />
            <SignUp />
        </LayoutUser>
    );
}
 
export default SignupPage;