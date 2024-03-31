const Backdrop = ({children, id, style}: IBackdrop) => {
    return (
        <BackdropWrapper id={id} style={{...style}}>
            {children}
        </BackdropWrapper>
    )
}



import styled from "styled-components"
import {motion} from "framer-motion";
import { ReactNode, CSSProperties } from "react";


type IBackdrop = {
    children: ReactNode,
    id?: string,
    style?: CSSProperties
}


const BackdropWrapper = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
`;




export default Backdrop;