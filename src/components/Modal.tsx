const Modal = ({children, header, close}: IModal) => {
    return (
        <ModalBackdrop
        style={{
            display: 'flex',
            alignItems: 'flex-start',
        }}
        >
            <ModalWrapper>
                <ModalHeader>
                    <h4>{header}</h4>
                    <span onClick={close}>
                        <AiOutlineClose />
                    </span>
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalWrapper>
        </ModalBackdrop>
    )
}



import { ReactNode } from "react"
import styled from "styled-components"

import Backdrop from "./Backdrop"
import { AiOutlineClose } from "react-icons/ai"


type IModal = {
    children: ReactNode;
    header: string;
    close: () => void;
}

const ModalBackdrop = styled(Backdrop)``;

const ModalWrapper = styled.div`
    background-color: ${props => props.theme.secondary.main};
    width: min(100% - 0.25rem, 500px);
    border-radius: 8px;
    display: flex;
    margin-inline: auto;
    flex-direction: column;
    margin-top: 150px;
`;
const ModalHeader = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme.dark.light};
    border-bottom: 0.25px solid ${props => props.theme.secondary.dark};

    > span {
        cursor: pointer;

        &:hover {
            scale: 1.1;
            color: ${props => props.theme.error.main};
        }
    }
`;
const ModalBody = styled.div`
    width:100%;
    padding: 20px;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;



export default Modal;