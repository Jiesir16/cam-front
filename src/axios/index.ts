// http.ts
import axios from "axios";
import { message } from "@/plugins/naive-ui-discrete-api.ts";
import router from "@/router";
import { useUsersStore } from "@/stores/modules/users.ts";
// 外部调用反馈组件
// naive-ui-discrete-api.ts
//import { createDiscreteApi } from 'naive-ui';

// 使用 createDiscreteApi 初始化，这里我们只初始化了 message，您可以根据需要添加更多
//const { message } = createDiscreteApi(['message']);
//message.success("123");

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
    config.headers.Authorization = useUsersStore().token;
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
    console.log("成功响应 response", response);
    if (response.status == 404) {
      message.error("资源路径错误");
    }

    return response;
  },
  (error) => {
    // 统一处理响应错误
    console.log("失败响应 error", error);
    if (error.response && error.response.status) {
      if (error.response.status === 404) {
        message.error("资源路径错误");
      } else if (error.response.status === 403) {
        router
          .push({ name: "403" })
          .then((r) => {
            console.log("403 push success", r);
            // todo 403跳转到403页面，并重新刷新资源菜单
            // 获取菜单资源
          })
          .catch((e) => {
            console.log("403 push faild", e);
          });
      } else {
        message.error(error.response.data);
      }
    } else {
      message.error(error.message);
    }

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
  downloadExcel: (url: string, params?: object) => {
    return http.get(url, { params, responseType: "blob" }).then((res) => {
      // 下载处理逻辑
      const filename = res.headers["content-disposition"];
      const blob = new Blob([res.data]);
      const downloadElement = document.createElement("a");
      // URL.createObjectURL()方法会根据传入的参数创建一个指向该参数对象的URL. 这个URL的生命仅存在于它被创建的这个文档里. 新的对象URL指向执行的File对象或者是Blob对象.
      const href = window.URL.createObjectURL(blob);
      downloadElement.href = href;
      let enCodeFileName = filename.split("filename=")[1];
      downloadElement.download = decodeURIComponent(enCodeFileName);
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
      // URL.revokeObjectURL()方法会释放一个通过URL.createObjectURL()创建的对象URL. 当你要已经用过了这个对象URL,然后要让浏览器知道这个URL已经不再需要指向对应的文件的时候,就需要调用这个方法.
      window.URL.revokeObjectURL(href);
    });
  },
};

export { restfulApi };
