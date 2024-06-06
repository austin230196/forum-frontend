const Register = ({}) => (
    <RegisterWrapper>
        <RegisterTemplate main canClose={false} />
    </RegisterWrapper>
)


import styled from "styled-components";

import RegisterTemplate from "./components/RegisterTemplate";
import { LoginWrapper } from "../Login";


const RegisterWrapper = styled(LoginWrapper)``;


export default Register;