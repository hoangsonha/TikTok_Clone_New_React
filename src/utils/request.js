import axios from 'axios';

const request = axios.create({
    // baseURL: 'https://tiktok.fullstack.edu.vn/api',
    baseURL: 'http://localhost:5029',
});

export const get = async (url, params = {}) => {
    const response = await request.get(url, params);

    return response.data;
};

// export const get = (url, params = {}) => {
//     return request
//         .get(url, params)
//         .then((res) => {
//             return res.data;
//         })
//         .catch(() => {});
// };
