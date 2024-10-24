export default class Store {
    public store: {refreshKey: string|null; accessKey: string|null} = {refreshKey: null, accessKey: null} 
    public constructor(protected storeKey: string){

    }

    public async get(key: "refreshKey" | "accessKey", defaultValue?: string) {
        let value = window.localStorage.getItem(this.storeKey);
        if((!value || value === "undefined") && !defaultValue) return null;
        else if ((!value || value === "undefined") && defaultValue) await this.set(key, defaultValue!);
        else this.store = JSON.parse(value!);
        return this.store[key];
    }


    public async set(key: "refreshKey" | "accessKey", value: string){
        //first fetch the storage
        let storage = window.localStorage.getItem(this.storeKey);
        //if there is no storage we create a new one using the template
        let template = null;
        if(!storage || storage === "undefined") template = this.store;
        else template = JSON.parse(storage);
        template[key] = value;
        this.store = {...template};
        window.localStorage.setItem(this.storeKey, JSON.stringify(this.store))
    }


    public async clear(){
        window.localStorage.removeItem(this.storeKey);
    }
}