import { defineStore } from "pinia";

export const useStatusStore = defineStore('status', {
    state: () => ({
        pName: true,
        pEmail: true
    }),
    actions: {
        setStatusPName(newStatus){
            this.pName = newStatus;
        },
        setStatusPEmail(newStatus){
            this.pEmail = newStatus;
        }
    }
})