import { authAction } from '../actions/authAction';

const initState = {
    user: null,
    isAuthenticated: false,
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authAction.ACTION_LOGIN:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case authAction.ACTION_LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};
