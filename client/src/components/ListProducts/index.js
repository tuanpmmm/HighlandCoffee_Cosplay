import { useEffect, useRef, useState } from "react";
import { Col } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { ButtonCategory, DataContainer, Product, TextSpan, SildeStyled } from "./styled";
import { useSelector } from 'react-redux'
import { globalSelector } from '../../redux/selector'
import { getAllCategories } from '../../services/categoryService';
import { getAllProducts } from '../../services/productService';
import ProductItem from './ProductItem';
// import Paginate from "../Paginate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const ListProducts = () => {

    const global = useSelector(globalSelector);

    const navigate = useNavigate();
    const carouselRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const { catename } = useParams();
    const loacation = useLocation();
    const query = loacation.search.split('=')[1];


    useEffect(() => {
        const getCategories = async () => {
            const res = await getAllCategories({page: global.page, keyword: query});
            setCategories(res.data);
        }
        getCategories();
    }, [])

    useEffect(() => {
        const getProducts = async () => {
            const res = await getAllProducts(global.page, catename, query);
            if (!catename && !query) {
                setProducts(res.data);
            } else {
                if (res.data) {
                    setProducts(res.data.rows);
                } else {
                    navigate('/not-found');
                }
            }
        }
        getProducts();
    }, [catename, query, global.page])

    useEffect(() => {
        const getProducts = async () => {
            const res = await getAllProducts(global.page, catename, query);
            if (catename || query) {
                if (res.data) {
                    setTotalPage(res.data.count / res.data.rows.length);
                }
            }
        }
        getProducts();
    }, [catename, query])



    const prevCarousel = () => {
        console.log(carouselRef.current.dots);
    }

    const nextCarousel = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    }


    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
      };


    return (
        <DataContainer>
            {
                !catename && !query ?
                    categories.map((category) => (
                        <DataContainer>
                            <ButtonCategory size="large" key={category?.id}>
                                <TextSpan>
                                    {category?.name}
                                </TextSpan>
                            </ButtonCategory>
                            <SildeStyled>
                                <Slider {...settings}>
                                    {products.map((product) =>
                                        product?.category_id === category?.id ? (
                                            <ProductItem productItem={product} />
                                        ) : ("")
                                    )}
                                </Slider>
                            </SildeStyled>
                        </DataContainer>
                    ))
                    : ''
            }

            {
                catename || query ?
                    <DataContainer>
                        <Product>
                            {products.map((product) =>
                                <Col style={{ margin: '16px 0' }} span={6} key={product?.id}>
                                    <ProductItem productItem={product} />
                                </Col>
                            )
                            }
                        </Product>
                        {/* {totalPage && <Paginate totalPage={totalPage} location='center' />} */}
                    </DataContainer>
                    : ''
            }

        </DataContainer>


    );
};

export default ListProducts;
