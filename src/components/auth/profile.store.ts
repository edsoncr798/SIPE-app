import type { IUser } from '@/components/auth/models/IUser'

const state = reactive({
    user: {} as IUser,
    isLoggedIn: false,
});

const getters = {
    getUser: () => state.user,

    goToWhassap: () => {
        const user = state.user;
        if (user.phone) {
            const phone = user.phone.replace(/ /g, '');
            const message = `Hola, tengo una consula, mi nombre es ${user.first_name} ${user.last_name}`;
            const url = `https://wa.me/51${phone}?text=${encodeURIComponent(message)}`;
            return window.open(url, '_blank');
        }
        return '';
    },

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