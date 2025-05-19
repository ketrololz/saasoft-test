import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export type MarkText = {
  text: string;
};

export interface User {
  id: string;
  marks: MarkText[];
  type: 'LDAP' | 'Local';
  login: string;
  password: string | null;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userList: useLocalStorage<User[]>('ketrololz-user-list', []),
  }),
  getters: {
    getUserById: (state) => {
      return (userId: string) =>
        state.userList.find((user) => user.id === userId);
    },
  },
  actions: {
    addUser(user: User) {
      this.userList.push(user);
    },
    removeUser(userId: string) {
      this.userList = this.userList.filter((user) => user.id !== userId);
    },
  },
});
