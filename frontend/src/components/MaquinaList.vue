<template>
  <table cellspacing="0" class="w-[100%] my-40 border-2 border-gray-300">
    <thead class="border-2 border-gray-400">
      <tr>
        <th>Nome</th><th>Series</th><th>Perfil</th><th>Ações</th>
      </tr>
    </thead>
    <tbody class="border-2 border-gray-400">
      <tr v-for="m in maquinas" :key="m._id" class="text-center">
        <td>{{ m.name }}</td>
        <td>{{ m.series }}</td>
        <td>{{ m.status }}</td>
        <td class="flex justify-center gap-2 my-2">
          <button @click="$emit('edit', m)" class="bg-yellow-500 text-white py-1 px-2 rounded">Editar</button>
          <button @click="$emit('remove', m._id)" class="bg-red-500 text-white py-1 px-2 rounded">Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({ maquinas: { type: Array, default: () => [] }});
const emit = defineEmits(["edit", "remove"]);
</script>
