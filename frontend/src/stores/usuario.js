import { defineStore } from "pinia";
import api from "../services/api";

export const useUserStore = defineStore("user", { // Criando um store
  state: () => ({ // States
    users: [],
    name: "",
    email: "",
    pass: "",
    google_id: "",
    loading: false,
    error: null
  }),
  actions: { // Actions
    setNewName(newName){
      this.name = newName;
    },
    setNewEmail(newEmail){
      this.email = newEmail;
    },
    setNewPass(newPass){
      this.pass = newPass;
    },
    setGoogleId(newGoogle_id){
      this.google_id = newGoogle_id;
    },
    async addUser(user) { // Req de add users
      this.error = null;
      try {
        const res = await api.post("/users", user);
        this.users.unshift(res.data);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao criar usuário";
      }
    }
  }
});
