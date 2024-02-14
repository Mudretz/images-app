import { makeAutoObservable, runInAction } from "mobx";
import { userService } from "../service";
import { User } from "../shared/types";

class UserStore {
    user: User | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    getUser = async (id: string) => {
        try {
            const response = await userService.getUserById({
                id: id,
            });
            runInAction(() => {
                this.user = response.user;
            });
        } catch (error) {}
    };
}

export default new UserStore();
