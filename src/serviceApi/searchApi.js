import { get } from '~/utils/request';

export const searchByNickNameOrFullName = async (fullName, nickName) => {
    try {
        const res = await get('/search', {
            params: {
                fullName,
                nickName,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error ne', error);
    }
};
