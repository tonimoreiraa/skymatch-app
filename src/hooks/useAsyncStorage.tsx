import { useEffect, useState } from "react";
import { AsyncStorage } from 'react-native';

const useAsyncStorage = (key: string, defaultValue: any) => {
    const [storageValue, updateStorageValue] = useState(defaultValue)
    const [updated, setUpdated] = useState(false)
  
    async function getStorageValue() {
        let value = defaultValue
        try {
            const storageValue = await AsyncStorage.getItem(key)
            value = storageValue ? JSON.parse(storageValue) : defaultValue
        } catch (e) {
        } finally {
            updateStorageValue(value)
            setUpdated(true)
        }
    }
  
    async function updateStorage(newValue: any) {
        try {
            if (newValue === null) {
                await AsyncStorage.removeItem(key)
            } else {
                const value = JSON.stringify(newValue)
                await AsyncStorage.setItem(key, value)
            }
        } catch (e) {
        } finally {
            setUpdated(false)
            getStorageValue()
        }
    }
  
    useEffect(() => {
        getStorageValue()
    }, [updated])
  
    return [storageValue, updateStorage]
}

export default useAsyncStorage;