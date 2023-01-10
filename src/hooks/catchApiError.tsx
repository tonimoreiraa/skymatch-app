import Toast from 'react-native-toast-message'

export default function catchApiError(err: any)
{
    const res = err.isAxiosError ? err.response : err
    if (!res.data) {
        return Toast.show({type: 'error', text1: res._response})
    }
    if (typeof(res.data) === 'string') {
        return Toast.show({type: 'error', text1: res.data})
    }
    if (res.data.message) {
        return Toast.show({type: 'error', text1: res.data.message})
    }
    if (res.data.errors) {
        return res.data.errors.map((error: any) => Toast.show({type: 'error', text1: error.message}))
    }
}