import styled from "styled-components";

export const ChatPageContainer = styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
`

export const MessagesContainer = styled.ScrollView`
    flex: 1;
    background-color: #e6e6e6;
    padding: 10px 25px;
`

export const ChatMessageContainer = styled.View<{self: boolean}>`
    width: 100%;
    flex-direction: row;
    justify-content: ${(props: any) => props.self ? 'flex-end' : 'flex-start'};
    margin-vertical: 3px;
`

export const ChatMessage = styled.View`
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 4px #d6d6d6;
    flex-direction: row;
    align-items: flex-end;
`

export const ChatMessageText = styled.Text`
    font-size: 15px;
    font-weight: 400;
`

export const ChatMessageDate = styled.Text`
    font-size: 11px;
    font-weight: 400;
    color: #666;
    margin-left: 8px;
`

export const BottomBarContainer = styled.View`
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    background-color: #f7f7f7;
`

export const MessageTextInput = styled.TextInput`
    border-radius: 8px;
    background-color: #FFF;
    flex: 1;
    height: 44px;
    padding-horizontal: 20px;
`

export const MessageSubmitButton = styled.TouchableOpacity`
    width: 44px;
    height: 44px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    margin-left: 5px;
`