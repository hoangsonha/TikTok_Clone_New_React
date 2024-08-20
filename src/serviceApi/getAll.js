import { get } from '~/utils/request';

export const apiAllVideo = async () => {
    try {
        const responseVideo = await get('/video/getAll');
        return responseVideo.data;
    } catch (error) {
        console.log('Error at apiAllVideo: ', error);
    }
};

export const apiAllUser = async () => {
    try {
        const responseUser = await get('/account/getAll');
        return responseUser.data;
    } catch (error) {
        console.log('Error at apiAllUser: ', error);
    }
};

export const apiAllVideoById = async (id) => {
    try {
        const response = await get('/video/getAll/account', {
            params: {
                accountID: id,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error at apiAllVideoById: ', error);
    }
};
