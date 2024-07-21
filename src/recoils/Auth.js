// recoil/atoms.js
import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        email: '',
        password: '',
        nickname: '',
        confirmPassword: '',
        isLoggedIn: false,
        isRegistered: false,
    },
});

