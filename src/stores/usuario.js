import { defineStore } from "pinia";

export const useUsuarioStore = defineStore('usuario', {
    state: () => ({
        name: '',
        email: ''
    }),
    actions: {
        setNewName(newName){
            this.name = newName;
        },
        setNewEmail(newEmail){
            this.email = newEmail;
        }
    }
})