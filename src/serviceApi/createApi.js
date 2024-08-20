import { post } from '~/utils/request';

export const RegisterAPI = async (params = {}) => {
    try {
        const response = await post('/account/create', params);
        return response;
    } catch (error) {
        console.log('Error at RegisterApi:', error);
    }
};

export const PostVideo = async (params = {}) => {
    try {
        const response = await post('/video/create', params);
        return response;
    } catch (error) {
        console.log('Error at PostVideo:', error);
    }
};
