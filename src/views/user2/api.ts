// 假设的 API 调用函数
export async function fetchUsersApi(params) {
  // 使用 fetch 或其他 HTTP 客户端获取用户数据
  return [
    {
      id: 1,
      createTime: "2024-02-19 07:01:05",
      createdBy: "system",
      updateTime: "2024-03-01 17:05:47",
      updatedBy: "123",
      username: "user",
      email: "1@qq.com",
      status: null,
      activated: true,
    },
    {
      id: 3,
      createTime: "2024-02-21 01:55:03",
      createdBy: "guest",
      updateTime: "2024-02-29 12:24:50",
      updatedBy: "guest",
      username: "user1",
      email: "1@qq.com",
      status: null,
      activated: true,
    },
  ]; // 返回用户列表
}

export async function editUserApi(user) {
  // 发送请求更新用户信息
}
