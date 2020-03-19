// @flow
import fetch from 'node-fetch'
import axios from 'axios'
import { AsyncStorage } from 'react-native';

const API_KEY = '23567b218376f79d9415' // other valid API keys: '760b5fb497225856222a', '0e2a751704a65685eefc'
const API_ENDPOINT = 'http://195.39.233.28:8035'

const api = axios.create({ baseURL: API_ENDPOINT })

export async function getPictures (page: number = 1): Object {
    return await api.get(`/images?page=${page}`).catch(err => err.response)
}

export async function getPictureDetails (id: number): Object {
    return await api.get(`/images/${id}`)
}

const saveToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.log('Error saving token');
    }
};

const getToken = async (): Promise<string> => {
    let token = '';
    try {
        token = await AsyncStorage.getItem('token') || '';
    } catch (error) {
        console.log('Error retrieving token');
    }
    return token;
};

api.interceptors.request.use(
    async config => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(response => {
    return response;
}, err => {
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
        {
            originalReq._retry = true;

            let res = fetch('http://195.39.233.28:8035/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    apiKey: API_KEY
                }),
            }).then(res => res.json()).then(async res => {
                await saveToken(res.token);
                originalReq.headers['Authorization'] = `Bearer ${res.token}`;

                return axios(originalReq);
            });

            resolve(res);
        }

        return resolve(err.toJSON());
    });
});
