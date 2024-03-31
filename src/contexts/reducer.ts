import { STORE_KEY } from "../constants";
import Store from "../utils/Store";
import storeUpdater from "../utils/store-updater.utils";
import { IDefaultValue } from "./GlobalContext";
import { INIT_STATE, LOGIN, LOGOUT } from "./actions";

export default function reducer(state: IDefaultValue, action: any){
    let store = new Store(STORE_KEY);
    switch(action.type){
        case LOGIN:
            let {userdata, refreshKey, accessKey} = action.payload;
            store.set("userdata", userdata);
            store.set("refreshKey", refreshKey);
            store.set("accessKey", accessKey);
            return storeUpdater(state, {isAuth: true, userdata});

        case LOGOUT:
            store.clear();
            return storeUpdater(state, {isAuth: false, userdata: null});


        case INIT_STATE:
            return storeUpdater(state, action.payload);
        default:
            return state;
    }
}