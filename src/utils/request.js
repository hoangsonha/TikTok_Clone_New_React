import axios from 'axios';

const request = axios.create({
    // baseURL: 'https://tiktok.fullstack.edu.vn/api',
    baseURL: 'http://localhost:5029',
});

export const get = async (url, params = {}) => {
    const response = await request.get(url, params);

    return response.data;
};

export const post = async (url, params = {}) => {
    const response = await request.post(url, params);

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

// token

// const requestne = axios.create({
//     baseURL: 'http://localhost:5029',
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true,
// });

// requestne.interceptors.request.use(function (config) {

//     const token = localStorage.getItem('jwtToken');

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // Interceptor để tự động xử lý response và chỉ trả về data
// requestne.interceptors.response.use(response => {
//     return response.data;
// }, error => {
//     return Promise.reject(error);
// });

// // Sử dụng hàm `get` như bình thường
// export const get = async (url, params = {}) => {
//     return await requestne.get(url, { params });
// };
