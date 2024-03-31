const Loader = ({color="#fff"}: {color?: string}) => {
    return (
        <LdsRing $color={color}><div></div><div></div><div></div><div></div></LdsRing>
    )
}



import styled, {keyframes} from "styled-components"


const ldsring = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
const LdsRing = styled.div<{$color: string}>`
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;

    > div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 24px;
        height: 24px;
        margin: 2px;
        border: 5px solid ${props => props.$color};
        border-radius: 50%;
        animation: ${ldsring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;

        &:nth-child(1) {
            animation-delay: -0.45s;
        }
        &:nth-child(2) {
            animation-delay: -0.3s;
        }
        &:nth-child(3) {
            animation-delay: -0.15s;
        }
    }
`;



export default Loader;