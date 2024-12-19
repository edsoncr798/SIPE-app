import type { IUser } from '@/components/auth/models/IUser'

const state = reactive({
    user: {} as IUser,
    isLoggedIn: false,
});

const getters = {
    getUser: () => state.user,

    getFullName: () => {
        const user = state.user;
        return `${user.first_name} ${user.last_name}`;
    },

    getIsLoggedIn: () => state.isLoggedIn,
};

const actions = {
    setUser: (user: IUser) => {
        state.user = user;
    },

    setIsLoggedIn: (value: boolean) => {
        state.isLoggedIn = value;
    },
};

export default {
    ...getters,
    ...actions,
}