import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8800/"
})

// Adiciona o token de acesso no header Authorization, se existir
api.interceptors.request.use((config) => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
        const { token } = JSON.parse(user);
        if (token) {
            config.headers.Authorization = token;
        }
    }
    return config;
});

export default api