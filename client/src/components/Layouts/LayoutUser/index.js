import Header from '../../Header/ForUser';
import Footer from '../../Footer';
import { LayoutUserStyled } from './styled';

const LayoutUser = ({ children }) => {



    return (
        <LayoutUserStyled>
            <Header />
            <div className='content'>
                {children}
            </div>
            <Footer />
        </LayoutUserStyled>
    );
}

export default LayoutUser;