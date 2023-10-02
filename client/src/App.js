import React from 'react';
import { Spin } from "antd";
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwtdecode from "jwt-decode";
import { getProfileCustomer } from './services/authService';
import userSlice from './redux/userSlice';
import './App.css';

// Admin 
const AdminRoutes = React.lazy(() => import("./pages/AdminRoutes"));
const PublicRoutes = React.lazy(() => import("./pages/PublicRoutes"));
const Overview = React.lazy(() => import("./pages/ADMIN/Overview"));
const AdminCustomers = React.lazy(() => import('./pages/ADMIN/Customers'));
const AdminCategory = React.lazy(() => import("./pages/ADMIN/Categories"));
const AdminDetailCategory = React.lazy(() => import("./pages/ADMIN/Categories/Detail"));

// Guest
const HomePage = React.lazy(() => import('./pages/Home'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SigupPage = React.lazy(() => import('./pages/SingupPage'));
const NotFoundPage = React.lazy(() => import('./pages/ErrorPage/NotFoundPage'));
const AboutUsPage = React.lazy(() => import('./pages/AboutPage'));
const PolicyPage = React.lazy(() => import('./pages/PolicyPage'));
const RefundPage = React.lazy(() => import('./pages/RefundPage'));


function LazyLoadingComponent({ children }) {
    return (
        <React.Suspense
            fallback={
                <div className="loading-center" style={{ height: "100vh" }}>
                    <Spin />
                </div>
            }
        >
            {children}
        </React.Suspense>
    )
}

const App = () => {

    const routes = [

        // ADMIN
        {
            element: (
                <LazyLoadingComponent>
                    <AdminRoutes />
                </LazyLoadingComponent>
            ),
            children: [
                {
                    path: '/admin/tong-quan',
                    element: (
                        <LazyLoadingComponent>
                            <Overview />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/khach-hang',
                    element: (
                        <LazyLoadingComponent>
                            <AdminCustomers />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/loai-san-pham',
                    element: (
                        <LazyLoadingComponent>
                            <AdminCategory />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/loai-san-pham/:slug',
                    element: (
                        <LazyLoadingComponent>
                            <AdminDetailCategory />
                        </LazyLoadingComponent>
                    )
                },
            ]
        },

        // GUEST
        {
            element: (
                <LazyLoadingComponent>
                    <PublicRoutes />
                </LazyLoadingComponent>
            ),
            children: [
                {
                    path: '/',
                    element: (
                        <LazyLoadingComponent>
                            <HomePage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/dang-nhap',
                    element: (
                        <LazyLoadingComponent>
                            <LoginPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/dang-ky',
                    element: (
                        <LazyLoadingComponent>
                            <SigupPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/gioi-thieu',
                    element: (
                        <LazyLoadingComponent>
                            <AboutUsPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/chinh-sach-bao-mat',
                    element: (
                        <LazyLoadingComponent>
                            <PolicyPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/chinh-sach-doi-tra',
                    element: (
                        <LazyLoadingComponent>
                            <RefundPage />
                        </LazyLoadingComponent>
                    ),
                },
            ]
        },
        {
            path: '*',
            element: (
              <LazyLoadingComponent>
                <NotFoundPage />
              </LazyLoadingComponent>
            )
          },
          {
            path: '/not-found',
            element: (
              <LazyLoadingComponent>
                <NotFoundPage />
              </LazyLoadingComponent>
            )
          }
    ]

    const element = useRoutes(routes);

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const user = jwtdecode(localStorage.getItem('token'));
            getProfile(user.payload.id)
        }
    }, [])

    const getProfile = async (id) => {
        const res = await getProfileCustomer(id);
        await dispatch(userSlice.actions.updateUser({...res.data, is_login:true}));
    }

    return (
        <>
            <ToastContainer />
            <div>{element}</div>
        </>
    );
}

export default App;