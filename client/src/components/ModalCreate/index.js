import { useState } from 'react';
import CollectionFormCategory from './ColectionFormCategory';
import ColectionFormProduct from './ColectionFormProduct';
import { Button } from 'antd';

const ModalCreate = ({ type }) => {

    const [open, setOpen] = useState(false);

    return (
        <div style={{marginBottom:'20px'}}>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Thêm {type}
            </Button>
            {
                type === 'sản phẩm' && <ColectionFormProduct
                    open={open}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
            }
            {
                type === 'loại sản phẩm' && <CollectionFormCategory
                    open={open}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
            }
        </div>
    );
}

export default ModalCreate;