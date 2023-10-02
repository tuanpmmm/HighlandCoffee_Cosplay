import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color:  #b5313a;
  font-weight: bold;
  padding: 0.8rem 30px;
  border-radius: 10px;
  border: 1px solid #EEEDED;
  margin-left: 20px;
  
  
  &:hover {
    color: #007bff;
  }

  &.active {
    background-color: #b5313a;
    color: #fff;
  }
`;