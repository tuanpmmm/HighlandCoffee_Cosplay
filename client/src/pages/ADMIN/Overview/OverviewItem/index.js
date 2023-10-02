import { OverviewItemStyled } from "./styled";


const OverviewItem = ( { total, title }) => {
    return (
        <OverviewItemStyled>
            <p style={{textAlign:'center', marginBottom:'8px', fontSize:'20px'}}>{total}</p>
            <p style={{textAlign:'center', fontSize:'20px'}}>{title}</p>
        </OverviewItemStyled>
    );
}
 
export default OverviewItem;