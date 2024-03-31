const Logo = () => {
    return (
        <LogoWrapper to="/">
            <p>F <b>E</b></p>
        </LogoWrapper>
    )
}



import {NavLink} from "react-router-dom";
import styled from "styled-components";


const LogoWrapper = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    > p {
        font-weight: 900;
        font-size: 4rem;
        color: ${props => props.theme.primary.main};
        font-family: cursive;
        position: relative;

        > b {
            font-family: cursive;
            position: absolute;
            top: 20px;
            right: -15px;
        }
    }
`;


export default Logo;