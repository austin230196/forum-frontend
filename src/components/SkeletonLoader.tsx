const SkeletonLoader = ({width, height}: ISkeletonProps) => {
    return <Skeleton style={{width, height, borderRadius: 8, display: 'block'}} />
}



import Skeleton from "react-loading-skeleton"

type ISkeletonProps = {
    width: number|string;
    height: number|string;
}



export default SkeletonLoader;