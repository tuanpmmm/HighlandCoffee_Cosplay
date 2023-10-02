import { useSelector } from 'react-redux';
import { userSelector } from "../../redux/selector";
import { Outlet } from 'react-router-dom';
import ForbiddenPage from '../ErrorPage/ForbiddenPage';


const AdminRoutes = () => {

    const user = useSelector(userSelector);

    return (
        <>
            {
                user.is_login && user.is_admin ?
                    <Outlet />
                    : <ForbiddenPage />
            }
        </>
    );
}

export default AdminRoutes;