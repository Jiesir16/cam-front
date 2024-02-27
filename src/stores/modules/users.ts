import { defineStore } from 'pinia';
import http from '@/axios/http';


export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
    }),
    actions: {
        async fetchUsers(params) {
            console.log(params)
            try {
                const response = await http.get('/api/users', { params });
                this.users = response.data;
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        },
        // 添加其他如 createUser、updateUser、deleteUser 等方法
    },
});
