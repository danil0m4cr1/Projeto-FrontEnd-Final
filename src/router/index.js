import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Contato from "../views/Contato.vue";
import Servicos from "../views/Servicos.vue";

const routes = [
    { path: '/', component: Home},
    { path: '/contato', component: Contato},
    { path: '/servicos', component: Servicos},
]

export default createRouter({history: createWebHistory(), routes});