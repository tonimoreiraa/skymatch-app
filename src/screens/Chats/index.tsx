import React from "react";
import { RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Api, { API_BASE_URL } from "../../Api";
import { UserType } from "../../types/UserTypes";
import { ChatContainer, ChatTextArea, ChatLastMessage, ChatLastMessageDate, ChatName, ChatProfileImage, ChatTextAreaContainer } from "./style";
import ChatsImage from '../../assets/chatting.svg';
import { Title } from "../../components/Texts";

function Chat(props: any)
{
    const lastMessageCreatedAt = new Date(props.lastMessage.created_at)

    return <ChatContainer onPress={props.onPress}>
        <ChatProfileImage source={{uri: API_BASE_URL + '/uploads/' + props.profile_photo}} />
        <ChatTextAreaContainer>
            <ChatTextArea>
                <ChatName>{props.name}</ChatName>
                <ChatLastMessage>{props.lastMessage.content}</ChatLastMessage>
            </ChatTextArea>
            <ChatTextArea>
                <ChatLastMessageDate>{lastMessageCreatedAt.toLocaleTimeString('pt-BR').slice(0, -3)}</ChatLastMessageDate>
            </ChatTextArea>
        </ChatTextAreaContainer>
    </ChatContainer>
}
class Chats extends React.Component<any>
{
    state: {chats: UserType[], refreshing: boolean} = {chats: [], refreshing: true}

    componentDidMount() {
        this.loadChats()    
    }
    
    loadChats() {
        this.setRefresh(true)
        Api().then(api => api.get('/chats').then(res => this.setState({...this.state, chats: res.data, refreshing: false})))
    }

    setRefresh = (refreshing: boolean) => this.setState({...this.state, refreshing})

    render() {
        const {chats} = this.state
        return !chats || !chats.length ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5}}>
            <ChatsImage width={200} height={200} />
            <Title style={{marginTop: 5, textAlign: 'center'}}>Aqui vão ficar suas conversas!</Title>
        </View> : <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.loadChats()} />}>
            {chats.map(chat => <Chat
                {...chat}
                onPress={() => this.props.navigation.navigate('Chat', {chatId: chat.id})}
                key={chat.id}
            />)}
        </ScrollView>
    }
}

export default Chats;