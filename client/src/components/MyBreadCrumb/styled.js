import { Breadcrumb } from "antd";
import styled from "styled-components";

export const BreadcrumbContainer = styled.div`
margin-top: 2rem;
`

export const BreadcrumbItem = styled(Breadcrumb.Item)`
cursor: pointer;
&:hover {
    color: red;
}
`