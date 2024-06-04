export const CircularLoader = ({color="inherit", size}: ILoader) => {
    return (
        <CircularProgress color={color} size={size} thickness={10} />
    )
}


export const LinearLoader = ({color="primary"}: Omit<ILoader, "size">) => (
    <LinearProgress color={color} />
)



import {CircularProgress, LinearProgress} from "@mui/material"


type ILoader = {
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit";
    size: number;
}