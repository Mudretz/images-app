import { makeAutoObservable } from "mobx";

class AppStore {
    twoColumns = false;

    constructor() {
        makeAutoObservable(this);
    }

    switchNumberColumn = () => {
        this.twoColumns = !this.twoColumns;
    };
}

export default new AppStore();
