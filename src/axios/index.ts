// http.ts
import axios from "axios";

// 外部调用反馈组件
// naive-ui-discrete-api.ts
//import { createDiscreteApi } from 'naive-ui';

// 使用 createDiscreteApi 初始化，这里我们只初始化了 message，您可以根据需要添加更多
//const { message } = createDiscreteApi(['message']);
//message.success("123");


// 环境变量中定义的 API 主机地址和基路径
const API_HOST = "http://localhost:8888";
const API_BASE_PATH = "/api/v1";

const JWT_STR =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJpc3MiOiJzeXN0ZW0iLCJpYXQiOjE3MDk5OTQxMTAsImV4cCI6MTcxMDU5ODkxMH0.HXgyMAteM_KnudWZ4q4AdNJ8xJtEUOnHKHzkF3-JnpA";

// 创建 Axios 实例
const http = axios.create({
  baseURL: `${API_HOST}${API_BASE_PATH}`, // 使用模板字符串拼接完整的 baseURL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 可以在这里为请求添加认证 token 等
    config.headers.Authorization = `Bearer ${JWT_STR}`;
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
    console.log(response);
    return response;
  },
  (error) => {
    // 统一处理响应错误
    return Promise.reject(error);
  },
);

// RESTful API 方法封装
const restfulApi = {
  get: (url: string, params?: object) => http.get(url, { params }),
  post: (url: string, data: object) => http.post(url, data),
  put: (url: string, data: object) => http.put(url, data),
  patch: (url: string, data: object) => http.patch(url, data),
  delete: (url: string) => http.delete(url),
};

export { restfulApi };
