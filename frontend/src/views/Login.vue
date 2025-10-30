<template>
    <section class="w-full min-h-[calc(100vh-143px)] flex justify-center">
        <div class="w-[80%] items-center justify-center mx-auto flex flex-col">
            <h1 class="text-3xl py-5 font-bold">Logue sua conta</h1>
            <div class="w-[700px] bg-blue-900 p-10 text-center">
                <form @submit.prevent="submitForm" class="flex flex-col items-center">
                    <div class="flex flex-col py-4 w-[80%]">
                        <label for="email" class="text-white py-1 text-[21px]">Email:</label>
                        <input type="email" name="email" id="email" v-model="emailInput" required class="w-[100%] h-[38px] bg-white outline-0 px-3 text-[19px] rounded-2xl">
                    </div>
                    <div class="flex flex-col py-4 w-[80%]">
                        <label for="pass" class="text-white py-1 text-[21px]">Senha:</label>
                        <input type="password" name="pass" id="pass" v-model="passInput" required class="w-[100%] h-[38px] bg-white outline-0 px-3 text-[19px] rounded-2xl">
                    </div>
                    <div>
                        <p class="hidden" id="user-err">Esse usuário não está cadastrado</p>
                    </div>
                    <input 
                    type="submit" 
                    value="Logar" 
                    class="bg-[#e9f5f9] w-[200px] h-[38px] font-bold rounded-2xl text-center cursor-pointer hover:bg-blue-200 max-sm:w-[100%] mt-5"
                    >
                    <p class="text-white p-y cursor-pointer mb-4 mt-1 hover:text-[#bebfbf]">
                        <router-link 
                        to="/cadastro"
                        >
                        Não tem uma conta? Cadastre-se
                        </router-link>
                    </p>
                </form>
                <div ref="googleButton" class="flex justify-center mt-4"></div>
            </div>
        </div>
        <div id="user-info"></div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import { useUserStore } from '../stores/usuario';

const router = useRouter();

const googleButton = ref(null);
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

let emailInput;
let passInput;

const usuario = useUserStore();

function redirect(){
    router.push('/perfil');
}

async function googleIntegration(response) {
    try {
        const res = await fetch("http://localhost:3000/api/users/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: response.credential })
        });

        const data = await res.json();
        usuario.setNewEmail(data.email);
        usuario.setNewName(data.name);
        usuario.setGoogleId(data.google_id);
        redirect();

    } catch (err) {
        console.error("Erro ao autenticar:", err);
        alert("Erro ao autenticar no servidor!");
    }
}

onMounted(() => {
    window.googleIntegration = googleIntegration;

    if (window.google && googleButton.value) {

        window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: googleIntegration,
            auto_select: false,
        });

        // Renderiza o botão manualmente
        window.google.accounts.id.renderButton(googleButton.value, {
            type: "standard",
            size: "large",
            theme: "outline",
            shape: "pill",
            text: "signin_with",
            width: 200,
        });
    }
})

async function checkEmailExists(email, pass){
    try {
        const response = await api.post("/users/check-user", { email, pass });
        const exists = response.data.exists;
        const name = response.data.name;
        return {exists, name};
    } catch(error) {
        console.error("Erro ao verificar usuário", error);
        return false;
    }
}

async function submitForm(){
    const userExists = await checkEmailExists(emailInput, passInput);
    if(userExists.exists){
        usuario.setNewEmail(emailInput);
        usuario.setNewName(userExists.name);
        redirect();
    } else {
        const generalErr = document.getElementById('user-err');

        if(userExists == false || passExists == false){
            generalErr.classList.add('general-err');
            generalErr.classList.remove('hidden');
        } else {
            generalErr.classList.add('hidden');
            generalErr.classList.remove('general-err');
        }
    }
}
</script>

<style scoped>
.general-err {color: red; font-weight: bold; display: block;}

.hidden {display: none;}
</style>