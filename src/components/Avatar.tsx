const Avatar = ({width, height, onClick}: IAvatar) => {
    return (
        <AvatarImage onClick={onClick} src={avatar} alt="Avatar" $width={width} $height={height} />
    )
}


interface IAvatar {
    width: number,
    height: number,
    onClick?: MouseEventHandler<HTMLImageElement>
}


import styled from "styled-components"
import { MouseEventHandler } from "react";

import avatar from "../assets/avatar.jpeg";

const AvatarImage = styled.img<{$width: number, $height: number}>`
    width: ${props => props.$width}px;
    height: ${props => props.$height}px;
    border-radius: 50%;
    cursor:pointer;
`;


export default Avatar;