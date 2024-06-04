const Register = ({}) => (
    <RegisterWrapper>
        <RegisterTemplate canClose={false} />
    </RegisterWrapper>
)


import styled from "styled-components";

import RegisterTemplate from "./components/RegisterTemplate";


const RegisterWrapper = styled.div`
    // background-color: ${props => props.theme.secondary.dark};
`;


export default Register;