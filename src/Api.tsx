import axios from 'axios';
import Toast from 'react-native-toast-message';
import { AsyncStorage } from 'react-native';

export const API_BASE_URL = 'https://api.skymatch.app'
// export const API_BASE_URL = 'http://192.168.31.78:3333'

const accessDeniedProcessor = function(error: any) {
    console.log(error.response)
    if (!error.response) {
        // network error
        Toast.show({type: 'error', text1: 'Não foi possível se conectar ao servidor.'})
        return Promise.reject(error)
    }

    if (error.response.status === 401) {
        AsyncStorage.removeItem('@auth-user-data')
        AsyncStorage.removeItem('@auth-user-token')
        Toast.show({type: 'error', text1: `Falha na autenticação: ${error.response.data.errors[0].message}`})
    }

    if (error.response.status === 403) {
        Toast.show({type: 'error', text1: `Acesso negado: Você não tem permissão para acessar este recurso.`})
    }

    return Promise.reject(error)
}

async function Api()
{
    var headers: {Authorization?: string, 'X-Origin': string} = {'X-Origin': 'admin-web'}
    var accessToken = JSON.parse(await AsyncStorage.getItem('@auth-user-token') ?? '""')

    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`
    
    const api = axios.create({baseURL: API_BASE_URL, headers, timeout: 10000})

    api.interceptors.response.use(response => response, accessDeniedProcessor)

    return api
}

export default Api