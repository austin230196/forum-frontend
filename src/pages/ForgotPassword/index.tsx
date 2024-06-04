const ForgotPassword = ({}) => (
    <ForgotPasswordWrapper>
        <ForgotPasswordTemplate />
    </ForgotPasswordWrapper>
)


import styled from "styled-components";

import ForgotPasswordTemplate from "./components/ForgotPasswordTemplate";



const ForgotPasswordWrapper = styled.div`
    // background-color: ${props => props.theme.secondary.dark};
`;


export default ForgotPassword;