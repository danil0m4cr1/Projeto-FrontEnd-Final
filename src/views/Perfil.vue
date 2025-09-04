<template>
    {{ store.name }}
    {{ store.email }}
</template>

<script setup>
import { useUsuarioStore } from '../stores/usuario';
const store = useUsuarioStore();
</script>