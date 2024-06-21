import {onMessage} from "firebase/messaging";
import { messaging } from "../firebase.config";

export default function usePermissions(){
    async function requestPermission(){
        const permission = await Notification.requestPermission();
        if(permission === 'denied'){
            console.log("User denied notification permission");
        }else if(permission === 'granted'){
            //granted successfully
            onMessage(messaging, (data: any) => {
                // console.log({data});
                let notification = new Notification(data?.notification?.title, {
                    body: data?.notification?.body
                });
                console.log({notification});

            })
        }
    }

    return {
        requestPermission
    }
}