

import axios from 'axios';

const journalApi = axios.create({
    baseURL: 'https://vue-demos-ec310-default-rtdb.firebaseio.com'
})

//console.log(process.env.NODE_ENV); //TEST durante testing

export default journalApi;