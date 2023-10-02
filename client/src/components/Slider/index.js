import Slider from "react-slick";
import { SildeStyled } from "./styled";

const SliderCustom = ({ dots, slidesToShow, arrows, children, autoplay }) => {

    const settings = {
        dots: dots,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        arrows: arrows,
        autoplay: autoplay
    };


    return (
        <SildeStyled>
            <Slider {...settings}>
                {children}
            </Slider>
        </SildeStyled>
    );
}
 
export default SliderCustom;