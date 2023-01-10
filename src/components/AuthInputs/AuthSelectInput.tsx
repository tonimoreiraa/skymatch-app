import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import RNPickerSelect from 'react-native-picker-select';
import {PickerSelectProps} from 'react-native-picker-select/index'
import styled from "styled-components";
import { InputContainer as AuthInputContainer, Label, Error } from "./style";

const InputContainer = styled.View`
    width: 100%;
    height: 50px;
    border: 1px solid ${(props: any) => props.error ? '#E74C3C' : '#fff'};
    border-radius: 10px;
    padding: 0 15px;
    color: ${(props: any) => props.error ? '#E74C3C' : '#fff'};
`

function AuthSelectInput({name, label, onValueChange, ...rest}: PickerSelectProps & {name: string, label: string})
{
    const [field, meta, helpers] = useField(name)
    const { value } = meta
    const { setValue } = helpers

    return <AuthInputContainer>
        {!!label && <Label>{label}</Label>}
        <InputContainer>
            <RNPickerSelect
                {...rest}
                onValueChange={(value, index) => {
                    setValue(value)
                    if (onValueChange) onValueChange(value, index)
                }}
                value={value}
                style={{
                    viewContainer: {justifyContent: 'center', flex: 1},
                    inputIOS: {color: '#FFF'},
                    inputAndroid: {color: '#FFF'}
                }}
                useNativeAndroidPickerStyle={false}
            />
        </InputContainer>
        {!!meta.error && <Error>{meta.error}</Error>}
    </AuthInputContainer>
}

export default AuthSelectInput;