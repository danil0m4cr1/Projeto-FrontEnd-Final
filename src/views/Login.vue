<template>
    <section class="w-full min-h-[calc(100vh-143px)] flex justify-center">
        <div class="w-[80%] items-center justify-center mx-auto flex flex-col">
            <h1 class="text-3xl py-5 font-bold">Logue sua conta</h1>
            <form @submit.prevent="redirect" class="w-[700px] bg-blue-900 p-10 flex flex-col items-center text-center">
                <div class="flex flex-col py-4 w-[80%]">
                    <label for="name" class="text-white py-1 text-[21px]">Nome Completo:</label>
                    <input type="text" name="name" id="name" @input="store.setNewName($event.target.value)" required class="w-[100%] h-[38px] bg-white outline-0 px-3 text-[19px] rounded-2xl">
                </div>
                <div class="flex flex-col py-4 w-[80%]">
                    <label for="email" class="text-white py-1 text-[21px]">Email:</label>
                    <input type="email" name="email" id="email" @input="store.setNewEmail($event.target.value)" required class="w-[100%] h-[38px] bg-white outline-0 px-3 text-[19px] rounded-2xl">
                </div>
                <input 
                type="submit" 
                value="Logar" 
                class="bg-[#e9f5f9] w-[200px] h-[38px] font-bold rounded-2xl text-center cursor-pointer hover:bg-blue-200 max-sm:w-[100%] my-5" 
                >
            </form>
        </div>
    </section>
</template>

<script setup>
import { useUsuarioStore } from '../stores/usuario';

const store = useUsuarioStore();
</script>

<script>
export default {
    methods: {
        redirect() {
            this.$router.push('/perfil')
        }
    }
}
</script>