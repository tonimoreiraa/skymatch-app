import { useField } from "formik";
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { SignUpSelectButton, SignUpSelectButtonText } from "../../screens/Auth/style";
import { InputContainer, Label, Error } from './style'

function AuthGenderInput({name, defaultValue, label, multiple = false, onChangeText}: any & {name: string, label: string, multiple?: boolean})
{
    const [field, meta, helpers] = useField(name)
    const { value } = meta
    const { setValue } = helpers

    useEffect(() => {
        const v = defaultValue ?? []
        if (!value.length && v) setValue(v)
    }, [defaultValue])
    
    const genderPress = useCallback((gender: string) => {
        const v = multiple ? (value.includes(gender) ? value.filter((item) => item != gender) : [...value, gender]) : gender
        setValue(v)
        if (onChangeText) onChangeText(v)
    }, [onChangeText, value])

    return <InputContainer>
        {!!label && <Label>{label}</Label>}
        <View style={{flexDirection: 'row'}}>
            <SignUpSelectButton active={multiple ? value.includes('male') : value == 'male'} onPress={() => genderPress('male')}>
                <SignUpSelectButtonText active={multiple ? value.includes('male') : value == 'male'}>Homem</SignUpSelectButtonText>
            </SignUpSelectButton>
            <SignUpSelectButton active={value.includes('female')} onPress={() => genderPress('female')}>
                <SignUpSelectButtonText active={value.includes('female')}>Mulher</SignUpSelectButtonText>
            </SignUpSelectButton>
        </View>
        {!!meta.error && <Error>{meta.error}</Error>}
    </InputContainer>
}

export default AuthGenderInput;