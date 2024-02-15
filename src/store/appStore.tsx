import { makeAutoObservable } from "mobx";
import { UserInfo } from "../shared/types";
import { TEXT_MESSAGES } from "../shared/constants";

class AppStore {
    twoColumns = false;
    isAuth = false;
    accessToken = "";

    users: UserInfo[] = [
        {
            email: "test@mail.ru",
            password: "123456",
        },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    switchNumberColumn = () => {
        this.twoColumns = !this.twoColumns;
    };

    inLogin = (user: UserInfo) => {
        const result = this.users.find((item) => item.email === user.email);
        if (result) {
            this.isAuth = true;
            return {
                status: 200,
                accessToken: "asdasdqwe123123",
            };
        } else {
            return {
                status: 400,
                message: TEXT_MESSAGES.invalid,
            };
        }
    };

    setToken = (token: string) => {
        this.accessToken = token;
    };

    logOut = () => {
        this.isAuth = false;
        this.accessToken = "";
    };
}

export default new AppStore();
