import { Form, Input, Modal } from 'antd';
import { createCategory } from '../../../services/categoryService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CollectionFormCategory = ({ open, onCancel }) => {

    const [form] = Form.useForm();

    const onCreate = async (values) => {
        const res = await createCategory(values);
        if(res.data) {
            toast.success('Thêm mới thành công');
            onCancel();
        } else {
            toast.error('Có lỗi xảy ra');
            onCancel();
        }
    }

    return (
        <Modal
            open={open}
            title="Thêm mới loại sản phẩm"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CollectionFormCategory;