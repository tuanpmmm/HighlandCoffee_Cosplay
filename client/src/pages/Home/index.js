import LayoutUser from "../../components/Layouts/LayoutUser";
import ListProducts from "../../components/ListProducts";
import SliderCustom from "../../components/Slider";
import slider_2 from "../../assets/images/slider_2.png";
import slider_3 from "../../assets/images/slider_3.png";
import slider_4 from "../../assets/images/slider_4.png";



const HomePage = () => {


    return (
        <LayoutUser>
            <SliderCustom dots={true} slidesToShow={1} arrows={false} autoplay={true}>
                <div>
                    <img style={{maxHeight:'280px', margin:'auto', width:'100%'}} src={slider_2} alt="" />
                </div>
                <div>
                    <img style={{maxHeight:'280px', margin:'auto', width:'100%'}} src={slider_3} alt="" />
                </div>
                <div>
                    <img style={{maxHeight:'280px', margin:'auto', width:'100%'}} src={slider_4} alt="" />
                </div>
            </SliderCustom>
            <ListProducts />
        </LayoutUser>
    );
}
 
export default HomePage;