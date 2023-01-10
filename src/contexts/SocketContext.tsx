import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import socketIOClient from "socket.io-client";
import { ActivityIndicator, AsyncStorage, View } from "react-native";
import { Title } from "../components/Texts";
import { Button, ButtonText } from "../components";
import Image from '../assets/two-factor-authentication.svg'
import Api, { API_BASE_URL } from "../Api";
import useAsyncStorage from "../hooks/useAsyncStorage";
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./AuthContext";

interface SocketContextType {
    socket: Socket
}

export const SocketContext = createContext<SocketContextType>({} as SocketContextType)

export const SocketContextProvider = (props: any) => {
    
    const [socket, setSocket] = useState<any>()
    const [fail, setFail] = useState<any>(false)
    const [token, setToken] = useAsyncStorage('@auth-client-token', undefined)
    const navigation = useNavigation()
    const authContext = useAuth()

    async function connectSocket()
    {
        console.log('Conectando ao servidor.')
        const attemptSocket = socketIOClient(process.env.SOCKET_BASE_URL ?? API_BASE_URL, {
            reconnectionAttempts: 2,
            timeout: 10000,
            extraHeaders: {
                'X-Client-Token': token
            }
        })

        async function updateClientToken() {
            const {data: {token: t}} = await (await Api()).get('/auth/generate-device-token')
            setToken(t)
        }

        attemptSocket.on('disconnect', async () => {
            setFail(true)
            updateClientToken()
        })
        attemptSocket.on('connect_error', (e) => {
            console.log(e)
            setFail(true)
            updateClientToken()
        })
        attemptSocket.on('connect', () => {
            setSocket(attemptSocket)
            setFail(false)
        })
        attemptSocket.on('new-message', (data) => {
            Toast.show({type: 'info', text1: data.message.senderUser.name, text2: data.message.content})
        })
        attemptSocket.on('new-match', (data) => {
            Toast.show({type: 'error', text1: `Você deu match com ${data.user.name}!`, onPress: () => {
                navigation.navigate('ChatNavigator', {screen: 'Chat', chatId: data.user.id})
            }})
        })
    }

    useEffect(() => {
        connectSocket()
    }, [token])

    const context = {socket}

    return fail ? <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'column'}}>
        <Image
            width={300}
            height={300}
        />
        <Title style={{textAlign: 'center', marginBottom: 10}}>Falha ao se conectar com a rede SkyWatch.</Title>
        <View style={{flexDirection: 'row'}}>
            <Button onPress={connectSocket}>
                <ButtonText>Tentar novamente</ButtonText>
            </Button>
            <Button style={{marginLeft: 5, backgroundColor: '#f4f4f4'}} onPress={() => authContext.signOut()}>
                <ButtonText style={{color: '#000'}}>Sair</ButtonText>
            </Button>
        </View>
    </View> : (socket ? <SocketContext.Provider value={context}>{props.children}</SocketContext.Provider> : <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
    </View>)
}

export const useSocket = () => useContext(SocketContext)