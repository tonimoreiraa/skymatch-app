import React from "react";
import { BottomBarContainer, ChatMessage, ChatMessageContainer, ChatMessageDate, ChatMessageText, ChatPageContainer, MessagesContainer, MessageSubmitButton, MessageTextInput } from "./style";
import Icon from 'react-native-vector-icons/Ionicons';
import { MessageType } from "../../types/ChatTypes";
import Api from "../../Api";
import { RefreshControl } from "react-native";
import { SocketContext } from "../../contexts/SocketContext";

function Message(props: MessageType & {self: boolean})
{
    const createdAt = new Date(props.created_at)
    return <ChatMessageContainer self={props.self}>
        <ChatMessage self={props.self}>
            <ChatMessageText>{props.content}</ChatMessageText>
            <ChatMessageDate>{createdAt.toLocaleTimeString('pt-BR').slice(0, -3)}</ChatMessageDate>
        </ChatMessage>
    </ChatMessageContainer>
}

class Chat extends React.Component<any>
{
    static contextType = SocketContext
    private scrollView: any;

    state: {
        messageContent?: any,
        messages: MessageType[],
        refreshing: boolean
    } = {messages: [], refreshing: true}

    constructor(props: any) {
        super(props)
        this.scrollView = React.createRef()
    }

    componentDidMount() {
        this.updateMessagesList()
        this.context.socket.on('new-message', (data: any) => {
            if ([data.message.from, data.message.to].includes(this.props.route.params.chatId)) {
                this.newMessage(data.message)
            }
        })
    }

    newMessage(message: MessageType) {
        this.setState({...this.state, messages: [...this.state.messages, message]})
    }

    async updateMessagesList() {
        this.setState({...this.state, refreshing: true})
        const chatId = this.props.route.params.chatId
        const api = await Api()
        const {data: messages} = await api.get(`/chats/${chatId}/messages`)
        this.setState({...this.state, messages, refreshing: false})
    }

    async sendTextMessage() {
        const chatId = this.props.route.params.chatId
        const messageContent = this.state.messageContent
        
        if (!messageContent || !messageContent.length) return false

        const {data} = await (await Api()).post('/messages', {
            to: chatId,
            type: 'text',
            content: this.state.messageContent
        })
        this.newMessage(data)
        this.setState({...this.state, messageContent: ''})
    }

    setMessageContent = (messageContent: any) => this.setState({...this.state, messageContent})

    render() {
        const chatId = this.props.route.params.chatId
        const { messages } = this.state
        return <ChatPageContainer>
            <MessagesContainer
                refreshControl={<RefreshControl refreshing={this.state.refreshing}
                onRefresh={() => this.updateMessagesList()} />}
                ref={this.scrollView}
                onContentSizeChange={() => this.scrollView.current.scrollToEnd({animated: true})}
            >
                {messages.map(message => <Message key={message.id} {...message}
                self={chatId == message.to}
            />)}
            </MessagesContainer>
            <BottomBarContainer>
                <MessageTextInput
                    placeholder="Digite uma mensagem"
                    onChangeText={this.setMessageContent}
                    value={this.state.messageContent}
                />
                <MessageSubmitButton onPress={() => this.sendTextMessage()}>
                    <Icon name="send" size={20} color="#999" />
                </MessageSubmitButton>
            </BottomBarContainer>
        </ChatPageContainer>
    }
}

export default Chat;