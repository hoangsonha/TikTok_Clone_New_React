import { put } from '~/utils/request';

export const updateAccountLogin = async (formData) => {
    try {
        const response = await put('/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.log('Error at updateAccountLogin : ', error);
    }
};
