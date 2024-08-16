import { type } from '@testing-library/user-event/dist/type';
import { authAction } from './authAction';

export const actionLogin = (user) => {
    return {
        type: authAction.ACTION_LOGIN,
        payload: user,
    };
};

export const actionLogout = () => {
    return {
        type: authAction.ACTION_LOGOUT,
    };
};
