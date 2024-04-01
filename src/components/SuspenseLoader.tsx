const SuspenseLoader = () => {
    return (
        <AnimationLayout
        animationData={loading}
        >
        </AnimationLayout>
        )
}



import AnimationLayout from "./AnimationLayout"
import * as loading from "../assets/lottie/programmable-forum-loading.json";



export default SuspenseLoader;