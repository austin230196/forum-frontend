import {getToken} from "firebase/messaging";
import { messaging } from "../firebase.config";


const getFCMToken = async (): Promise<string> => {
    const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_PUB_KEY
    })
    return token;
}



export default getFCMToken;