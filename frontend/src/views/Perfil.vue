<template>
    <section class="w-full min-h-[calc(100vh-143px)]">
        <div class="w-[80%] items-center justify-center mx-auto flex flex-col relative">
            <div v-if="userStore.email != null && userStore.email != ''">
                <h1
                class="text-3xl text-center my-15">
                Seja bem vindo de volta, <br><b>{{userStore.name}}</b></h1>
                <button
                class="absolute top-6 right-0 font-bold text-[18px] text-white bg-blue-900 py-2 px-5 rounded-2xl cursor-pointer hover:bg-[#2243ff] transition duration-300"
                @click="Logout">Logout</button>

                <MaquinaForm
                    v-if="!editing"
                    @submit="maquinaStore.addMaq"
                    :submitting="maquinaStore.loading"
                />

                <MaquinaForm
                    v-else
                    :initial="editing"
                    :submitting="store.loading"
                    @submit="(payload) => { maquinaStore.updateMaq(editing._id, payload); editing=null; }"
                    @cancel="cancelEdit"
                    edit
                />

                <p v-if="maquinaStore.error" style="color:#b00020">{{ maquinaStore.error }}</p>

                <MaquinaList :maquinas="maquinaStore.maquinas" @edit="edit" @remove="maquinaStore.removeMaq" />

            </div>
            <div v-else class="text-center my-30">
                <h1 class="text-3xl font-bold">Você não está logado</h1>
                <p class="text-[21px] pb-10 pt-2">Volte para a página de login e se autentique</p>
                <router-link 
                    to="/login" 
                    class="font-bold text-blue-700 hover:text-[#152792] text-[21px] transition duration-200">IR PARA PÁGINA DE LOGIN
                </router-link>
            </div>
        </div>
        
    </section>
</template>

<script setup>
import { useMaquinaStore } from "../stores/maquinas";
import { useUserStore } from '../stores/usuario';
import MaquinaForm from '../components/MaquinaForm.vue';
import MaquinaList from "../components/MaquinaList.vue";
import { ref, onMounted } from "vue";

const userStore = useUserStore();
const maquinaStore = useMaquinaStore();
const editing = ref(null);

onMounted(() => {
  maquinaStore.fetchMaq();
});

function edit(maquina) {
  editing.value = { ...maquina };
}

function cancelEdit() {
  editing.value = null;
}

function Logout(){
    userStore.$reset();
}

</script>