import { IUserdata } from "../types/User";

export default class Store {
    public store: {refreshKey: string|null; accessKey: string|null, userdata: IUserdata|null} = {refreshKey: null, accessKey: null, userdata: null} 
    public constructor(protected storeKey: string){

    }

    public async get(key: "refreshKey" | "accessKey" | "userdata", defaultValue?: string) {
        let value = window.localStorage.getItem(this.storeKey);
        if(!value) await this.set(key, defaultValue!);
        else this.store = JSON.parse(value!);
        return this.store[key];
    }


    public async set(key: string, value: string){
        //first fetch the storage
        let storage = window.localStorage.getItem(this.storeKey);
        //if there is no storage we create a new one using the template
        let template = null;
        if(!storage) template = this.store;
        else template = JSON.parse(storage);
        template[key] = value;
        this.store = {...template};
        window.localStorage.setItem(this.storeKey, JSON.stringify(this.store))
    }


    public async clear(){
        window.localStorage.removeItem(this.storeKey);
    }
}