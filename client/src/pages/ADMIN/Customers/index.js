import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/Layouts/LayoutAdmin";
import TableCustom from "../../../components/Table/TableCustom";
import { getAllCustomer } from "../../../services/authService";
import { useLocation, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelector } from '../../../redux/selector';
import { AutoComplete, Input } from "antd";


const AdminCustomers = () => {


    const [customers, setCustomers] = useState([]);
    const loacation = useLocation();
    const keyword = loacation.search.split('=')[1];
    const navigate = useNavigate();
    const global = useSelector(globalSelector);

    const column = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
    ]

    let data = [];

    customers && customers.forEach((customer, index) =>
        data.push({
            key: index,
            STT: index,
            fullname: customer?.fullname,
            email: customer?.email
        })
    )

    useEffect(() => {
        getCustomers();
    }, [keyword])

    const getCustomers = async () => {
        const res = await getAllCustomer({ keyword, page: global.page });
        if (res.data) {
            setCustomers(res.data.rows);
        }
    }

    return (
        <LayoutAdmin>
            <AutoComplete
                popupClassName="certain-category-search-dropdown"
                style={{
                    width: '90%',
                    margin: 'auto'
                }}
            >
                <Input.Search
                    onSearch={(e) => navigate(`/search?query=${e}`)}
                    size="large" />
            </AutoComplete>
            <TableCustom column={column} data={data} title='khách hàng' />
        </LayoutAdmin>
    );
}

export default AdminCustomers;