// http.ts
import axios from 'axios';

// 创建 Axios 实例
const http = axios.create({
    baseURL: 'http://localhost:8888/api/v1', // 你的 API 基础地址
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
    config => {
        // 在这里可以添加请求头，例如：config.headers.Authorization = `Bearer yourToken`;
        // 或者进行其他请求前的配置
        return config;
        },
    error => {
        // 处理请求错误
        return Promise.reject(error);
    }
    );

// 响应拦截器
http.interceptors.response.use(
    response => {
        // 在这里可以根据后端返回的数据结构进行统一的处理
        return response.data;
        },
    error => {
        // 处理响应错误
        return Promise.reject(error);
    }
    );

export default http;
