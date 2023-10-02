import LayoutAdmin from '../../../components/Layouts/LayoutAdmin';
import { useState, useEffect } from 'react';
import { getAllCustomer } from '../../../services/authService';
import { getAllCategories } from '../../../services/categoryService';
import { getAllProducts } from '../../../services/productService';
import { gettAllOrdersWaiting } from '../../../services/orderService';
import { globalSelector } from '../../../redux/selector';
import { useSelector } from 'react-redux'
import OverviewItem from './OverviewItem';

const Overview = () => {

    const [totalCategories, setTotalCategories] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalWatingConfirms, setTotalWatingConfirms] = useState(0);

    const global = useSelector(globalSelector);

    const items = [
        {
            total: totalCategories,
            title: 'Loại sản phẩm'
        },
        {
            total: totalProducts,
            title: 'Sản phẩm'
        },
        {
            total: totalCustomers,
            title: 'Khách hàng'
        },
        {
            total: totalWatingConfirms,
            title: 'Đơn hàng chờ xác nhận'
        },
    ]

    useEffect(() =>{
        const getCustomers = async () => {
            const res = await getAllCustomer({page: global.page});
            setTotalCustomers(res.data.count);
        }
        getCustomers();
    }, [])

    useEffect(() =>{
        const getCategories = async () => {
            const res = await getAllCategories({page: global.page});
            setTotalCategories(res.data.length);
        }
        getCategories();
    }, [])

    useEffect(() =>{
        const getProducts = async () => {
            const res = await getAllProducts();
            setTotalProducts(res.data.length);
        }
        getProducts();
    }, [])

    useEffect(() =>{
        const getOrderWaitings = async () => {
            const res = await gettAllOrdersWaiting(global.page);
            setTotalWatingConfirms(res.data.count);
        }
        getOrderWaitings();
    }, [])

    return (
        <LayoutAdmin>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent: 'space-between'}}>
                {
                    items.map(item =>
                        <OverviewItem total={item.total} title={item.title}/>
                    )
                }
            </div>
        </LayoutAdmin>
    );
}
 
export default Overview;