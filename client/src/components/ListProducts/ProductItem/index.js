import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import { ProductImg, CardProduct, Buy, Price, OldPrice, ProductContainer } from "./styled";
import { Rate, message } from "antd"
import Meta from "antd/es/card/Meta";
import globalSlice from '../../../redux/globalSlice';
import { globalSelector } from '../../../redux/selector';
// import { addToCart } from '../../../services/';


const ProductItem = ({ productItem }) => {

    const dispatch = useDispatch();
    const global = useSelector(globalSelector);
    const [rating, setRating] = useState(0);

    // const handleAddToCart = async () => {
    //     const data = {
    //         product_id: productItem.id,
    //         quantity: 1,
    //         price: productItem.discount ? (productItem.price - (productItem.price * (productItem.discount / 100))) : productItem.price,
    //         image: productItem.image,
    //         name: productItem.name
    //     }
    //     const res = await addToCart(data);
    //     dispatch(globalSlice.actions.changeRerender(!global.reRender));
    //     message.success('Sản phẩm đã được chuyển vào giỏ hàng')
    // }


    return (
        <ProductContainer >
            <div>
                <Link to={`/chi-tiet-san-pham/${productItem?.id}`}>
                    <CardProduct
                        hoverable
                        cover={<ProductImg alt="product" src={`http://localhost:5000/${productItem?.image}`} />}
                    >
                        <Meta title={productItem?.name} />
                        {productItem?.discount !== 0 ? <><Price>{productItem?.price - (productItem?.price * (productItem?.discount / 100))?.toFixed()}.000đ</Price> <OldPrice>{productItem?.price}.000đ</OldPrice></> : <Price>{productItem?.price}.000đ</Price>}
                        <div style={{ marginBottom: '12px' }}>
                            <Rate allowHalf value={rating} onChange={(value) => setRating(value)} />
                        </div>
                    </CardProduct>
                </Link>
            </div>

            <Buy
                // onClick={() => handleAddToCart()}
            >
                <span><ShoppingCartOutlined /> Chọn mua</span>
            </Buy>
        </ProductContainer>
    );
}

export default ProductItem;