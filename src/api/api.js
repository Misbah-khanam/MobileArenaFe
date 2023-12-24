import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:5000/',
//    baseURL: 'https://mobile-arena-api.onrender.com/'
});


api.interceptors.request.use((req) => {
    const cookies = document.cookie.split(';');
    let token = null;

    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            token = value;
            break;
        }
    }
    if(token){
        req.headers.authorization = `Bearer ${token}`
    }
    return req
})

export default api
