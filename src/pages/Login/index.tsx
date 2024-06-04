const Login = ({}) => (
    <LoginWrapper>
        <LoginTemplate canClose={false} />
    </LoginWrapper>
)


import styled from "styled-components";

import LoginTemplate from "./components/LoginTemplate";


const LoginWrapper = styled.div`
    // background-color: ${props => props.theme.secondary.dark};
`;


export default Login;