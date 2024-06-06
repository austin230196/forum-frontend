const SkeletonLoader = ({width, height}: ISkeletonProps) => {
    const store = useGlobalContext();
    const theme = useStore(store as StoreApi<GlobalState>, (state) => state.theme);
    return <Skeleton style={{width, height, borderRadius: 8, display: 'block'}} baseColor={theme === 'dark' ? 'rgb(20, 20, 20)' : undefined} highlightColor={theme === 'dark' ? 'rgb(10, 10, 10)' : undefined} />
}



import Skeleton from "react-loading-skeleton"
import { useGlobalContext } from "../contexts/GlobalContext"
import { StoreApi, useStore } from "zustand";
import { GlobalState } from "../contexts/store";

type ISkeletonProps = {
    width: number|string;
    height: number|string;
}



export default SkeletonLoader;