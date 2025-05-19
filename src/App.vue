<script setup lang="ts">
import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Select from 'primevue/select';
import { useUserStore, type MarkText, type User } from './state/user-store';
import { markRaw, ref } from 'vue';

const store = useUserStore();
const accountType = ref([
  {
    name: 'Локальная',
    type: 'Local',
  },
  {
    name: 'LDAP',
    type: 'LDAP',
  },
]);

const testUser: User = {
  id: 1,
  login: 'test',
  type: 'Local',
  password: '12345',
  marks: [{ text: 'test' }, { text: 'test2' }]
}

function convertMarks(marks: MarkText[]) {
  const result = marks.reduce((acc, mark) => acc.concat(mark.text, '; '), '');
  return result.trim().slice(0, -1);
}

store.addUser(testUser)
</script>

<template>
  <div class="p-10">
    <div class="flex flex-col gap-y-4">
      <div class="flex items-center gap-x-4">
        <h1 class="text-2xl font-semibold">Учётные записи</h1>
        <Button icon="pi pi-plus" variant="outlined"></Button>
      </div>
      <div
        class="bg-(--p-button-secondary-background) px-4 py-3 rounded-xl flex items-center gap-x-2"
      >
        <i class="pi pi-info-circle" style="font-size: 1.2rem"></i>
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель <span class="font-bold text-green-600">;</span>
      </div>
    </div>
    <Form
      v-for="user of store.userList"
      v-bind:key="user.id"
      v-slot="$form"
      class="flex flex-col gap-4 w-full pt-4"
    >
      <div class="flex gap-2">
        <InputText
          name="mark"
          type="text"
          placeholder="XXX; YYY"
          class="min-w-40"
          :value="convertMarks(user.marks)"
          fluid
        />
        <Select
          v-model="user.type"
          :options="accountType"
          optionLabel="name"
          optionValue="type"
          class="min-w-40"
        />
        <div class="flex gap-2 w-full">
          <InputText
            name="login"
            type="text"
            placeholder="Логин"
            :value="user.login"
            class="flex-1"
            fluid
          />
          <Password
            name="password"
            type="password"
            placeholder="Пароль"
            toggle-mask
            v-model="user.password"
            :feedback="false"
            class="flex-1"
            fluid
          />
        </div>
        <Message
          v-if="$form.username?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.username.error?.message }}</Message
        >
        <Button severity="secondary" icon="pi pi-trash" class="min-w-10" @click="store.removeUser(user.id)" />
      </div>
    </Form>
  </div>
</template>
