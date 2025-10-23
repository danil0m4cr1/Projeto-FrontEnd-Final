<template>
    <div class="w-[700px] bg-blue-900 p-10 text-center">
        <form @submit.prevent="onSubmit" class="flex flex-col items-center">
            <div class="w-[80%] flex flex-col gap-2 py-4">
                <label for="name" class="text-white py-1 text-[21px]">Nome da Máquina:</label>
                <input type="text" name="name" id="name" v-model="state.name" class="w-[100%] h-[38px] bg-white outline-0 px-3 text-[19px] rounded-2xl">
            </div>

            <div class="w-[80%] flex flex-col gap-2 py-4">
                <label for="series" class="text-white py-1 text-[21px]">ID de Série:</label>
                <input type="text" name="series" id="series" v-model="state.series" class="w-[100%] h-[38px] bg-white outline-0 px-3 text-[19px] rounded-2xl">
            </div>

            <select v-model="state.status" class="w-[80%] h-[38px] mt-6 bg-white outline-0 px-3 text-[19px]">
                <option disabled value="">Escolha uma opção:</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Funcionando">Funcionando</option>
            </select>

            <div class="flex">
                <button :disabled="submitting" class="font-bold text-white bg-[#2243ff] py-2 px-5 rounded-2xl cursor-pointer hover:bg-[#2039c7] transition duration-300 mx-auto my-4">{{ edit ? "Salvar" : "Adicionar" }}</button>
                <button v-if="edit" type="button" @click="$emit('cancel')" class="font-bold text-white bg-red-600 py-2 px-5 rounded-2xl cursor-pointer hover:bg-red-700 transition duration-300">Cancelar</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  initial: { type: Object, default: null },
  submitting: { type: Boolean, default: false },
  edit: { type: Boolean, default: false }
});
const emit = defineEmits(["submit", "cancel"]);

const state = reactive({
  name: "",
  series: "",
  status: ""
});

watch(() => props.initial, (val) => {
  if (val) {
    state.name = val.name || "";
    state.series = val.series || "";
    state.status = val.status || "";
  } else {
    state.name = ""; state.series = ""; state.status = "";
  }
}, { immediate: true });

function onSubmit() {
  emit("submit", { name: state.name, series: state.series, status: state.status });
}
</script>
