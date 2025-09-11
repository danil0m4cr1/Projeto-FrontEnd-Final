<template>
    <div class="bg-blue-900 w-full text-white p-6">
        <div class="flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div class="font-bold">
                <h3 class="text-3xl">Manutenções Pro</h3>
            </div>
            <div class="menu">
                <ul class="flex gap-14 text-[20px] text-center max-sm:flex-col max-sm:gap-5">
                    <li class="cursor-pointer">
                        <router-link 
                        to="/" 
                        class="border-b-2 border-transparent hover:border-b-2 hover:border-white transition duration-200">
                        Home
                        </router-link>
                    </li>
                    <li class="cursor-pointer">
                        <router-link 
                        to="/servicos"
                        class="border-b-2 border-transparent hover:border-b-2 hover:border-white transition duration-200">
                        Serviços
                        </router-link>
                    </li>
                    <li class="cursor-pointer">
                        <router-link 
                        to="/contato"
                        class="border-b-2 border-transparent hover:border-b-2 hover:border-white transition duration-200">
                        Contato
                        </router-link>
                    </li>
                    <li class="cursor-pointer">
                        <router-link 
                        v-if="store.name != '' && store.email != ''"
                        to="/perfil"
                        class="border-b-2 border-transparent hover:border-b-2 hover:border-white transition duration-200">
                        Perfil
                        </router-link>
                        <router-link 
                        v-else
                        to="/login"
                        class="border-b-2 border-transparent hover:border-b-2 hover:border-white transition duration-200">
                        Login
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUsuarioStore } from '../stores/usuario';
const store = useUsuarioStore();

let logged;
let url;

if(store.name == ""){
    logged = "Login"
    url = "/login"
} else {
    logged = "Perfil"
    url = "/perfil"
}
</script>

<script>
export default {
    name: "Navbar"
}

</script>