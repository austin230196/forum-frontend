const ForgotPassword = ({}) => (
    <ForgotPasswordWrapper>
        <ForgotPasswordTemplate main />
    </ForgotPasswordWrapper>
)


import styled from "styled-components";

import ForgotPasswordTemplate from "./components/ForgotPasswordTemplate";
import { LoginWrapper } from "../Login";



const ForgotPasswordWrapper = styled(LoginWrapper)``;


export default ForgotPassword;