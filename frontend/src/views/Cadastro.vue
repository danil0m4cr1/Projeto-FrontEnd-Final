<template>
    <section class="w-full min-h-[calc(100vh-143px)] flex justify-center">
        <div class="w-[80%] items-center justify-center mx-auto flex flex-col">
            <h1 class="text-3xl py-5 font-bold">Cadastre-se</h1>
            <div class="w-[700px] bg-blue-900 p-10 text-center">
                <form @submit.prevent="submitForm" class="flex flex-col items-center">
                    <div class="flex flex-col py-4 w-[80%]">
                        <label for="name" class="text-white py-1 text-[21px]">Nome Completo:</label>
                        <input type="text" name="name" id="name" v-model="nameInput" required class="w-[100%] h-[38px] bg-white outline-0 px-3 text-[19px] rounded-2xl">
                        <p 
                        v-if="status.pName == false"
                        class="text-red-600 text-[18px]"
                        >Digite um nome válido</p>
                    </div>
                    <div class="flex flex-col py-4 w-[80%]">
                        <label for="email" class="text-white py-1 text-[21px]">Email:</label>
                        <input type="email" name="email" id="email" v-model="emailInput" required class="w-[100%] h-[38px] bg-white outline-0 px-3 text-[19px] rounded-2xl">
                        <p 
                        v-if="status.pEmail == false"
                        class="text-red-600 text-[18px]"
                        >Digite um email válido</p>
                    </div>
                    <div class="flex flex-col py-4 w-[80%]">
                        <label for="pass" class="text-white py-1 text-[21px]">Senha:</label>
                        <input type="password" name="pass" id="pass" v-model="passInput" required class="w-[100%] h-[38px] bg-white outline-0 px-3 text-[19px] rounded-2xl">
                        <p 
                        v-if="status.pPass == false"
                        class="text-red-600 text-[18px]"
                        >Digite uma senha válida</p>
                    </div>
                    <input 
                    type="submit" 
                    value="Cadastrar" 
                    class="bg-[#e9f5f9] w-[200px] h-[38px] font-bold rounded-2xl text-center cursor-pointer hover:bg-blue-200 max-sm:w-[100%] mt-5"
                    >
                    <p class="text-white p-y cursor-pointer mb-4 mt-1 hover:text-[#bebfbf]">
                        <router-link 
                        to="/login"
                        >
                        Já tem conta? Logue agora
                        </router-link>
                    </p>
                </form>
                <div>
                    <p class="text-center text-white text-[18px]">Ou</p>
                    <div id="g_id_onload"
                        data-client_id="504391658440-8dslv576bkbs0ou2h9fiokpoveqk3ruo.apps.googleusercontent.com"
                        data-callback="googleIntegration">
                    </div>
                    <div class="g_id_signin pt-4 flex justify-center"
                        data-type="standard"
                        data-size="large"
                        data-theme="outline"
                        data-text="signin_with"
                        data-shape="pill"
                        data-logo_alignment="left"
                        data-width="200">
                    </div>
                </div>
            </div>
        </div>
        <div id="user-info"></div>
    </section>
</template>

<script setup>
import { useUserStore } from '../stores/usuario';
import { useStatusStore } from '../stores/status';
import { useRouter } from 'vue-router';
import api from '../services/api';
import { ref } from 'vue';

const store = useUserStore();
const status = useStatusStore();
const router = useRouter();

let nameInput = ref('');
let emailInput = ref('');
let passInput = ref('');

function validName(nameInput){
    const nameRegex = /^[A-Za-z]+\s?[A-Za-z]+\s?[A-Za-z]+\s?[A-Za-z]+\s?[A-Za-z]+\s?[A-Za-z]+$/;
    if (!nameRegex.test(nameInput)) {
        return false;
    } else {
        return true;
    }
}

function validEmail(emailInput){
    const emailRegex = /^[a-zA-Z0-9.-_]+[@][a-zA-Z]+[.][a-zA-Z]+$/;
    if (!emailRegex.test(emailInput)) {
        return false;   
    } else {
        return true;
    }
}

function validPass(passInput){
    const passRegex = /^[a-zA-Z0-9.-_@!?$]+$/;
    if(!passRegex.test(passInput)){
        return false;
    } else {
        return true;
    }
}

function redirect(){
    router.push('/perfil')
}

async function createAccount(name, email, pass){
    try {
        const response = await api.post("/users", { name, email, pass });
        const nameFront = response.data.name;
        const emailFront = response.data.email;
        return {nameFront, emailFront};
    } catch(error) {
        console.error("Erro ao criar usuário", error);
        return false;
    }
}

async function submitForm(){
    const nameValidation = validName(nameInput.value);
    const emailValidation = validEmail(emailInput.value);
    const passValidation = validPass(passInput.value);

    if(nameValidation && emailValidation && passValidation){
        store.setNewName(nameInput.value);
        store.setNewEmail(emailInput.value);

        status.setStatusPName(true);
        status.setStatusPEmail(true);

        console.log(nameInput.value, emailInput.value, passInput.value)

        await createAccount(nameInput.value, emailInput.value, passInput.value);
    } else {
        const inputName = document.getElementById('name');
        const inputEmail = document.getElementById('email');
        const inputPass = document.getElementById('pass');

        if(nameValidation == false){
            status.setStatusPName(false);
            inputName.classList.add('err-msg');
        } else {
            status.setStatusPName(true);
            inputName.classList.remove('err-msg');
        }
        if(emailValidation == false){
            status.setStatusPEmail(false);
            inputEmail.classList.add('err-msg');
        } else {
            status.setStatusPEmail(true);
            inputEmail.classList.remove('err-msg');
        }
        if(passValidation == false){
            status.setStatusPPass(false);
            inputPass.classList.add('err-msg');
        } else {
            status.setStatusPPass(true);
            inputPass.classList.remove('err-msg');
        }
    }
}
</script>

<style scoped>
.err-msg {border: 2px solid red;}
</style>