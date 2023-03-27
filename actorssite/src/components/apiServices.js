import axios from 'axios';

const http = axios.create({
    baseURL: "https://switch-yam-equator.azurewebsites.net/api/",
    headers:{'x-chmura-cors': '9a3076b9-58d1-4772-b019-0d274611395c'}
});

export default {
    GetAllMovies() {
        return http.get('movies');
    },
    GetAllActors() {
        return http.get('actors');
    },
    Further(actors){
        return http.post('validation',actors);
    }
}