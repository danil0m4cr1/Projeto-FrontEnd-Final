<template>
    <section class="w-full min-h-[calc(100vh-143px)]">
        <div class="w-[80%] items-center justify-center mx-auto flex flex-col relative">
            <div v-if="store.name != null && store.email != null && store.name != '' && store.email != ''">
                <h1
                class="text-3xl text-center my-15">
                Seja bem vindo de volta, <br><b>{{store.name}}</b></h1>
                <button
                class="absolute top-6 right-0 font-bold text-[18px] text-white bg-blue-900 py-2 px-5 rounded-2xl cursor-pointer hover:bg-[#2243ff] transition duration-300"
                @click="Logout">Logout</button>
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
import { useUserStore } from '../stores/usuario';
const store = useUserStore();

function Logout(){
    store.setNewName("");
    store.setNewEmail("");
    store.setNewPass("");
}

</script>