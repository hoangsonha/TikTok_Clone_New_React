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
            console.log(action);
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        case authAction.Action_UPDATE:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
