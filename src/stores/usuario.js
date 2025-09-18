import { defineStore } from "pinia";

export const useUsuarioStore = defineStore('usuario', {
    state: () => ({
        name: '',
        email: '',
        picture: ''
    }),
    actions: {
        setNewName(newName){
            this.name = newName;
        },
        setNewEmail(newEmail){
            this.email = newEmail;
        },
        setNewPicture(newPic){
            this.picture = newPic;
        }
    }
})