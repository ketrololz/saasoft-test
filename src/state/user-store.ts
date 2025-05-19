import { defineStore } from 'pinia';

export type MarkText = {
  text: string;
};

export interface User {
  id: number;
  marks: MarkText[];
  type: 'LDAP' | 'Local';
  login: string;
  password: string | null;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userList: [] as User[],
  }),
  getters: {
    getUserById: (state) => {
      return (userId: number) =>
        state.userList.find((user) => user.id === userId);
    },
  },
  actions: {
    addUser(user: User) {
      this.userList.push(user);
    },
    removeUser(userId: number) {
      this.userList = this.userList.filter((user) => user.id !== userId);
    },
  },
});
