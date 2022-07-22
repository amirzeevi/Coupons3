import axios from 'axios';
import { store } from '../redux/store';
import { updateToken } from './../redux/authState';

export const jwtAxios = axios.create();

jwtAxios.interceptors.request.use(request => {
    request.headers = {
        "Authorization": store.getState().authState.userToken
    }
    return request;
})

jwtAxios.interceptors.response.use(response => {
    if ((response.headers.authorization !== undefined)) {
        store.dispatch(updateToken(response.headers.authorization))
        window.sessionStorage.setItem("jwt", response.headers.authorization)
    }
    return response;
})