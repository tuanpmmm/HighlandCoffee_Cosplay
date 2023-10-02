import { useState, useEffect } from "react";
import LayoutAdmin from "../../../components/Layouts/LayoutAdmin";
import TableCustom from "../../../components/Table/TableCustom";
import { Link, useLocation } from "react-router-dom";
import ModalCreate from "../../../components/ModalCreate";
import { getAllCategories } from "../../../services/categoryService";
import { Space } from 'antd'
import { useSelector } from "react-redux";
import { globalSelector } from "../../../redux/selector";


const AdminCategory = () => {

    const [categories, setCategories] = useState([]);
    const loacation = useLocation();
    const query = loacation.search.split('=')[1];
    const global = useSelector(globalSelector);


    const onDelete = (e) => {

    }

    const column = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Link to={`/loai-san-pham/${record.slug}`}>Chi tiết</Link>
                    <Link onClick={(e) => onDelete(e)}>Xóa</Link>
                </Space>
            ),
        }
    ]

    let data = [];
    categories && categories.forEach((cate, index) =>
        data.push({
            stt: index + 1,
            name: cate.name,
            slug: cate.slug
        })
    )

    useEffect(() => {
        getCategories();
    }, [query])

    const getCategories = async () => {
        const res = await getAllCategories({ page: global.page, keyword: query || '' });
        if (res.data) {
            setCategories(res.data.rows);
        }
    }


    return (
        <LayoutAdmin>
            <ModalCreate type='loại sản phẩm' />
            <TableCustom
                column={column}
                data={data}
                title='loại sản phẩm'
            />
        </LayoutAdmin>
    );
}

export default AdminCategory;