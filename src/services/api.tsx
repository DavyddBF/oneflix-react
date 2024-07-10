import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;

// Base da URL = https://api.themoviedb.org/3/
// URL da API  = movie/now_playing?api_key=184ee90db92bf2330058b37260977a7f&language=pt-br