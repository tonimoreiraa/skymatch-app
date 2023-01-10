import styled from "styled-components";

export const ChatContainer = styled.TouchableOpacity`
    width: 100%;
    height: 80px;
    margin-bottom: 1px;
    background-color: #FFF;
    padding: 10px 20px;
    flex-direction: row;
`

export const ChatProfileImage = styled.Image`
    width: 60px;
    height: 60px;
    background-color: #f4f4f4;
    border-radius: 30px;
`

export const ChatTextAreaContainer = styled.View`
    flex: 1;
    margin-left: 20px;
    flex-direction: row;
    padding-vertical: 8px;
    justify-content: space-between;
`

export const ChatTextArea = styled.View`
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`

export const ChatName = styled.Text`
    font-size: 18px;
    font-weight: 600;
`

export const ChatLastMessage = styled.Text`
    font-size: 16px;
    font-weight: 400;
    color: #666;
`

export const ChatLastMessageDate = styled.Text`
    font-size: 14px;
    font-weight: 400;
`