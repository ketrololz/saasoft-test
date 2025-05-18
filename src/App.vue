<script setup lang="ts">
import Button from 'primevue/button';
</script>

<template>
  <div class="flex flex-col gap-y-4 p-10"> 
    <div class="flex items-center gap-x-4">
      <h1 class="text-2xl font-semibold">Учётные записи</h1>
      <Button icon="pi pi-plus" variant="outlined"></Button>
    </div>
    <div class="bg-zinc-100 px-4 py-3 rounded-xl flex items-center gap-x-2">
      <i class="pi pi-info-circle" style="font-size: 1.2rem"></i>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель <span class="font-bold text-green-600">;</span>
    </div>
  </div>
</template>
