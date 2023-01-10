import styled from "styled-components";

export const ProfilePhoto = styled.Image`
    width: 250px;
    height: 250px;
    border-radius: 8px;
    border-width: 1px;
    border-color: #ffffff5f;
    background-color: #ffffff15;
`

export const FirstTimePageContainer = styled.ImageBackground`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const FirstTimeTitle = styled.Text`
    font-size: 44px;
    font-weight: 700;
    color: #FFF;
`

export const FirstTimeButton = styled.TouchableOpacity`
    height: 50px;
    border-radius: 8px;
    background-color: ${props => props.color ?? '#FFF'};
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-vertical: 5px;
    padding-horizontal: 10px;
`

export const PolicyMessage = styled.Text`
    color: #FFF;
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
`

export const FirstTimeButtonText = styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: #000;
    text-align: center;
    flex: 1;
`

export const FirstTimeOrText = styled.Text`
    font-size: 14px;
    font-weight: 700;
    color: #FFF;
    margin-vertical: 10px;
    text-align: center;
`

export const AuthPageContainer = styled.View`
    flex: 1;
    background-color: #3F0BAD;
    align-items: center;
    justify-content: center;
    padding: 25px;
`

export const AuthTitle = styled.Text`
    font-size: 28px;
    font-weight: 700;
    color: #FFF;
    text-align: center;
`


export const AuthSubTitle = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: #FFF;
    text-align: center;
`

export const AuthButton = styled.TouchableOpacity`
    flex: 1;
    height: 50px;
    border-radius: 12px;
    background-color: #DA326C;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    flex-direction: row;
`

export const SignUpSelectButton = styled.TouchableOpacity`
    height: 50px;
    border: 1px solid #fff;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    padding: 0 25px;
    background-color: ${props => props.active ? '#FFF' : 'transparent'};
`

export const SignUpSelectButtonText = styled.Text`
    color: ${props => props.active ? '#3F0BAD' : '#FFF'};
    font-size: 18px;
`

export const AuthButtonText = styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: #FFF;
`

export const AuthButtonBack = styled.TouchableOpacity`
    flex: 0.5;
    height: 50px;
    border-radius: 12px;
    background-color: #e6e6e6;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    flex-direction: row;
`

export const AuthButtonBackText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #000;
`

export const GenderContainer = styled.TouchableOpacity`
    width: 250px;
    height: 50px;
    border-radius: 10px;
    background-color: #E9EBE9;
    margin-top: 5px;
    align-items: center;
    justify-content: center;
    border: ${props => props.active ? '1px solid #E5383B' : 'none'};
`

export const GenderText = styled.Text`
    font-size: 18px;
    font-weight: 400;
    color: ${props => props.active ? '#E5383B' : '#000'};
`

export const CodeInput = styled.TextInput`
    flex: 1;
    height: 60px;
    border: 1px solid rgba(255,255,255, 0.5);
    border-radius: 8px;
    margin-horizontal: 5px;
    text-align: center;
    font-size: 24px;
    color: #FFF;
`