const Dialog = ({children}: {children: ReactNode}) => {
    return (
        <DialogBackdrop style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <DialogWrapper>
                {children}
            </DialogWrapper>
        </DialogBackdrop>
    )
}



import { ReactNode } from "react";
import styled from "styled-components";

import Backdrop from "./Backdrop";


const DialogBackdrop = styled(Backdrop)``;

const DialogWrapper = styled.div`
    width: min(100% - 0.5rem, 400px);
    border-radius: 8px;
    padding: 20px;
    margin-inline: auto;
    margin-top: 150px;
    background-color: ${props => props.theme.secondary.main};
`;



export default Dialog;