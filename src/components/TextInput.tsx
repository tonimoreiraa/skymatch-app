import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    margin-top: 10px;
`

export const Label = styled.Text`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #666;
`

const Input = styled.TextInput`
    width: 100%;
    height: 50px;
    background-color: #FFF;
    border-radius: 10px;
    padding: 0 15px;
`

function TextInput({ name, label, labelColor, ...rest }: TextInputProps & {name?: string, label: string, labelColor?: string})
{
    return <Container>
        {!!label && <Label style={{color: labelColor}}>{label}</Label>}
        <Input {...rest} />
    </Container>
}

export default TextInput