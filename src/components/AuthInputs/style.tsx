import styled from "styled-components";

export const InputContainer = styled.View`
    width: 100%;
    margin-top: 12px;
`

export const Label = styled.Text`
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #FFF;
`

export const Error = styled.Text`
    font-size: 14px;
    font-weight: 500;
    margin-top: 5px;
    color: #E74C3C;
`

export const Input = (component: any) => styled(component)`
    width: 100%;
    height: 50px;
    border: 1px solid ${props => props.error ? '#E74C3C' : '#fff'};
    border-radius: 10px;
    padding: 0 15px;
    color: ${props => props.error ? '#E74C3C' : '#fff'};
    font-size: 16px;
`