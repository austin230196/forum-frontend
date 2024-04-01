const UserWelcome = () => {
    return (
        <UserWelcomeWrapper>
            <AnimationLayout
            animationData={data}
            >
                <CustomNavLink
                to="/login"
                >
                    Congratulations, Login
                </CustomNavLink>
            </AnimationLayout>
        </UserWelcomeWrapper>
    )
}



import styled from "styled-components"

import AnimationLayout from "../../components/AnimationLayout";
import { CustomNavLink } from "../NotFound";



import * as data from "../../assets/lottie/programmable-forum-felicitation.json";




const UserWelcomeWrapper = styled.div`
`;



export default UserWelcome;