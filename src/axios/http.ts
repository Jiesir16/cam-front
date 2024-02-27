// http.ts
import axios from "axios";

// 环境变量中定义的 API 主机地址和基路径
const API_HOST = "http://localhost:8888";
const API_BASE_PATH = "/api/v1";

// 创建 Axios 实例
const http = axios.create({
  baseURL: `${API_HOST}${API_BASE_PATH}`, // 使用模板字符串拼接完整的 baseURL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 可以在这里为请求添加认证 token 等
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJpc3MiOiJzeXN0ZW0iLCJpYXQiOjE3MDkwNDc2OTMsImV4cCI6MTcwOTA0ODU5M30.5_E4-aaVgeS-GaagIsb88eYJqS7hJjPo-1zB0WYfYx0`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 统一处理响应数据
    console.log(response.data);
    return response.data;
  },
  (error) => {
    // 统一处理响应错误
    return Promise.reject(error);
  },
);

// RESTful API 方法封装
const restfulApi = {
  get: (url, params) => http.get(url, { params } ),
  post: (url, data) => http.post(url, data),
  put: (url, data) => http.put(url, data),
  delete: (url) => http.delete(url),
  // 其他需要的 RESTful 方法...
};

export { restfulApi };
