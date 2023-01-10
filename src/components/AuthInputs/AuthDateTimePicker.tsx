import React, { useEffect } from "react";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform } from "react-native";
import styled from "styled-components";
import { Error, InputContainer, Label } from "./style";
import { useField } from "formik";

const Button = styled.TouchableOpacity`
    width: 100%;
    height: 45px;
    border: 1px solid #FFF;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
`

const ButtonText = styled.Text`
    color: #FFF;
    font-size: 16px;
`

function AuthDateTimePicker({name, label, onChange, defaultValue, ...rest}: any & {name: string, label: string})
{
    const [field, meta, helpers] = useField(name)
    const { value } = meta
    const { setValue } = helpers

    useEffect(() => {
        if (defaultValue) {
            setValue(new Date(defaultValue).getTime())
        }
    }, [defaultValue])

    async function handleSelectDateTimeAndroid() {
        DateTimePickerAndroid.open({mode: 'date', value: value || new Date(), onChange: (event) => {
            if (!event.nativeEvent.timestamp) return
            const date = new Date(event.nativeEvent.timestamp)
            date.setSeconds(0)
            DateTimePickerAndroid.open({mode: 'time', value: date, onChange: (event) => {
                if (event.nativeEvent.timestamp) setValue(new Date(event.nativeEvent.timestamp))
                if (onChange) onChange(event)
            }})
        }})
    }

    return <InputContainer>
        {!!label && <Label>{label}</Label>}
        {Platform.OS == 'ios' ? <DateTimePicker
            themeVariant="dark"            
            mode="datetime"
            {...rest}
            value={new Date(value)}
            onChange={(event: any) => {
                setValue(event.nativeEvent.timestamp)
                if (onChange) onChange(event)
            }}
        /> : <>
            <Button onPress={handleSelectDateTimeAndroid}>
                <ButtonText>{value ? new Date(value).toString() : 'Selecionar data e hora'}</ButtonText>
            </Button>
        </>}
        {!!meta.error && <Error>{meta.error}</Error>}
    </InputContainer>
}

export default AuthDateTimePicker;