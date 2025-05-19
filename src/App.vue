<script setup lang="ts">
import Button from 'primevue/button';
import { Form, FormField } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { useUserStore, type MarkText, type User } from './state/user-store';
import { ref } from 'vue';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import { userSchema } from './validator/schema';

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

function convertMarks(marks: MarkText[]) {
  const result = marks.reduce((acc, mark) => acc.concat(mark.text, '; '), '');
  return result.trim().slice(0, -1);
}

function parseMarks(text: string): MarkText[] {
  return text.split(';').map((text) => ({ text: text.trim() }));
}

function createUser() {
  const user: User = {
    id: generateId(),
    login: '',
    type: 'Local',
    password: '',
    marks: [],
  };

  store.addUser(user);
}

function generateId(): string {
  return self.crypto.randomUUID();
}

const resolver = yupResolver(userSchema);

const initialValues = {
  login: '',
  password: '',
};

function onBlur(form: any, user: User) {
  if (form.valid) {
    const userFromStore = store.getUserById(user.id);
    if (!userFromStore) {
      return;
    }

    userFromStore.login = form.login.value;
    userFromStore.password = form.password.value;
    userFromStore.marks = parseMarks(form.marks.value)
  }
}
</script>

<template>
  <div class="p-10">
    <div class="flex flex-col gap-y-4">
      <div class="flex items-center gap-x-4">
        <h1 class="text-2xl font-semibold">Учётные записи</h1>
        <Button
          icon="pi pi-plus"
          variant="outlined"
          @click="createUser"
        ></Button>
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
      v-slot="form"
      class="flex flex-col gap-4 w-full pt-4"
      :initial-values="initialValues"
      :resolver="resolver"
      :validate-on-blur="true"
    >
      <div class="flex gap-2">
        <FormField
          v-slot="$field"
          name="marks"
          :initialValue="convertMarks(user.marks)"
          class="w-full"
        >
          <InputText
            name="marks"
            type="text"
            placeholder="XXX; YYY"
            class="min-w-40"
            v-model="$field.value"
            @blur="onBlur(form, user)"
            maxlength="50"
            fluid
          />
        </FormField>
        <Select
          v-model="user.type"
          :options="accountType"
          optionLabel="name"
          optionValue="type"
          class="min-w-40"
          @change="
            (e) => {
              if (e.value === 'LDAP') user.password = null;
            }
          "
        />
        <div class="flex gap-2 w-full">
          <FormField
            v-slot="$field"
            name="username"
            :initialValue="user.login"
            class="w-full"
          >
            <InputText
              name="login"
              type="text"
              v-model="$field.value"
              placeholder="Логин"
              class="flex-1"
              maxlength="100"
              @blur="onBlur(form, user)"
              fluid
            />
          </FormField>
          <FormField
            v-if="user.type === 'Local'"
            v-slot="$field"
            name="password"
            :initialValue="user.password"
            class="w-full"
          >
            <InputText
              name="password"
              type="password"
              placeholder="Пароль"
              v-model="$field.value"
              :feedback="false"
              class="flex-1"
              maxlength="100"
              @blur="onBlur(form, user)"
              fluid
            />
          </FormField>
        </div>
        <Button
          severity="secondary"
          icon="pi pi-trash"
          class="min-w-10"
          @click="store.removeUser(user.id)"
        />
      </div>
    </Form>
  </div>
</template>
