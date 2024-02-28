import { restfulApi } from '@/axios/http'

// 假设 UserData 和 Params 定义了数据的结构
interface UserData {
    id: number;
    // 其他字段...
}

interface Params {
    // 定义参数的结构
}

export default {
    create: (data: UserData) => restfulApi.post('/user', data),
    read: (params: Params = {}) => restfulApi.get('/user/list',  params ),
    update: (data: UserData) => restfulApi.patch(`/user/${data.id}`, data),
    delete: (id: number) => restfulApi.delete(`/user/${id}`),
    resetPwd: (id: number, data: UserData) => restfulApi.patch(`/user/password/reset/${id}`, data),
}
