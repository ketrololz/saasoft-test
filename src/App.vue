<script setup lang="ts">
import { reactive } from 'vue';
import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Select from 'primevue/select';
</script>

<template>
  <div class="p-10">
    <div class="flex flex-col gap-y-4">
      <div class="flex items-center gap-x-4">
        <h1 class="text-2xl font-semibold">Учётные записи</h1>
        <Button icon="pi pi-plus" variant="outlined"></Button>
      </div>
      <div class="bg-(--p-button-secondary-background) px-4 py-3 rounded-xl flex items-center gap-x-2">
        <i class="pi pi-info-circle" style="font-size: 1.2rem"></i>
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель <span class="font-bold text-green-600">;</span>
      </div>
    </div>
    <Form v-slot="$form" class="flex flex-col gap-4 w-full pt-4">
      <div class="flex gap-2">
        <InputText
          name="mark"
          type="text"
          placeholder="XXX; YYY"
          class="min-w-40"
          fluid
        />
        <Select
          v-model="selectedPasswordType"
          :options="passwordType"
          optionLabel="type"
          placeholder="Локальная"
        />
        <div class="flex gap-2 w-full">
          <InputText
            name="login"
            type="text"
            placeholder="Логин"
            class="flex-1"
            fluid
          />
          <Password
            name="password"
            type="password"
            placeholder="Пароль"
            toggle-mask
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
        <Button severity="secondary" icon="pi pi-trash" class="min-w-10" />
      </div>
    </Form>
  </div>
</template>
