import axios from "axios";

const urlBase = 'https://jsonplaceholder.typicode.com';

const instance = axios.create({
    baseURL: urlBase,
});

export default instance;