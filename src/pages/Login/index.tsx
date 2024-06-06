const Login = ({}) => (
    <LoginWrapper>
        <LoginTemplate main canClose={false} />
    </LoginWrapper>
)


import styled from "styled-components";

import LoginTemplate from "./components/LoginTemplate";


export const LoginWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.secondary.dark};
    display: flex;
    align-items: center;
    justify-content: center;
`;


export default Login;