const NotFound = () => {
    return (
        <NotFoundWrapper>
            <AnimationLayout
            animationData={data}
            >
                <CustomNavLink
                to="/"
                >
                    Back Home
                </CustomNavLink>
            </AnimationLayout>
        </NotFoundWrapper>
    )
}



import styled from "styled-components"

import AnimationLayout from "../../components/AnimationLayout";



import * as data from "../../assets/lottie/programmable-forum-not-found.json";
import { NavLink } from "react-router-dom";



const NotFoundWrapper = styled.div`
    margin-top: 100px;
`;

export const CustomNavLink = styled(NavLink)``;


export default NotFound;