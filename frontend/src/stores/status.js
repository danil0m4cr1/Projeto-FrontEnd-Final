import { defineStore } from "pinia";

export const useStatusStore = defineStore('status', {
    state: () => ({
        pName: true,
        pEmail: true,
        pPass: true
    }),
    actions: {
        setStatusPName(newStatus){
            this.pName = newStatus;
        },
        setStatusPEmail(newStatus){
            this.pEmail = newStatus;
        },
        setStatusPPass(newStatus){
            this.pPass = newStatus;
        }
    }
})