import { post } from '~/utils/request';

export const LoginAPI = async (params = {}) => {
    try {
        const response = await post('/login', params);
        return response;
    } catch (error) {
        console.log('Error at LoginApi:', error);
    }
};

export const RegisterAPI = async (params = {}) => {
    try {
        const response = await post('/account/create', params);
        return response;
    } catch (error) {
        console.log('Error at RegisterApi:', error);
    }
};
