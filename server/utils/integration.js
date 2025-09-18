import { useUsuarioStore } from "../../src/stores/usuario";
export async function googleIntegration(response) {
    const usuarioStore = useUsuarioStore();

    try {
    // Envia o token para o backend
    const res = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential })
    });

    const data = await res.json();

    if (data.error) {
        alert("Erro: " + data.error);
        return;
    }

    // Salvo os dados
    usuarioStore.setNewName(data.name);
    usuarioStore.setNewEmail(data.email);
    usuarioStore.setNewPicture(data.picture);
    
    } catch (err) {
        console.error("Erro ao autenticar:", err);
        alert("Erro ao autenticar no servidor!");
    }
}