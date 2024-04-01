const AnimationLayout = ({children, animationData=data}: {children: ReactNode, animationData?: any}) => {
    // const defaultOptions = {

    //     rendererSettings: {
    //         preserveAspectRatio: 'xMidYMid slice'
    //     }
    // }
    return (
        <AnimationLayoutWrapper>
            <AnimationLayoutAnimation
                play
                loop={true}
                animationData={animationData}
                style={{height: '600px', width: "100%"}}
            />
            <AnimationLayoutAction>
                {children}
            </AnimationLayoutAction>
        </AnimationLayoutWrapper>
    )
}




import { ReactNode } from "react"
import styled from "styled-components";
import Lottie from "react-lottie-player";


import * as data from "../assets/lottie/programmable-forum-felicitation.json";




const AnimationLayoutWrapper = styled.div`
    width: min(100%-0.25rem, 600px);
    max-width: 1200px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
`;

const AnimationLayoutAnimation = styled(Lottie)``;

const AnimationLayoutAction = styled.div`
    > a {
        background-color: ${props => props.theme.primary.main};
        color: ${props => props.theme.secondary.main};
        width: min(100% - 0.25rem, 300px);
        padding: 10px;
        text-decoration:none;
        gap: 10px;
        cursor: pointer;
        // border-radius: 8px;
        border: none;

        // &:hover {
        //     scale: 1.1;
        // }

        // > b {
        //     // font-weight: 500;
        // }

        // > span {
        //     text-transform: uppercase;
        //     font-weight: 900;
        // }
    }
`;




export default AnimationLayout;