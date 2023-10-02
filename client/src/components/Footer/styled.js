import styled from 'styled-components';

export const FooterContainer = styled.div`
  color: #000000;
  padding: 2rem 0;
  border-box: 1px black solid;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
`;

export const FooterSize = styled.div`
  max-width: 80%;
  margin: auto;
`;

export const FooterTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
`;

export const FooterContent = styled.p`
  font-weight: 350;
  max-width: 250px;
`;

export const FooterIcon = styled.a`
 padding: 20px 10px 0 0;
 color: inherit;  
 font-size: 20px;
 &:hover {
  color: #1890ff;
`;