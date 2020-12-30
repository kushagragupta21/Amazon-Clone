import axios from 'axios';

const instance = axios.create({
    basURL: '...'    //THE API (cloud function) URL


})

export default instance;