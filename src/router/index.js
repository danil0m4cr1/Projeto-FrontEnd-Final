import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Contato from "../views/Contato.vue";
import Servicos from "../views/Servicos.vue";
import Login from "../views/Login.vue";
import Perfil from "../views/Perfil.vue";

const routes = [
    { path: '/', component: Home},
    { path: '/contato', component: Contato},
    { path: '/servicos', component: Servicos},
    { path: '/login', component: Login},
    { path: '/perfil', component: Perfil}
]

export default createRouter({history: createWebHistory(), routes});