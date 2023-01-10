import React, { useState } from "react";
import { FirstTimeButton, FirstTimePageContainer, FirstTimeButtonText, FirstTimeTitle, FirstTimeOrText, PolicyMessage } from "../style";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import TextInput from "../../../components/TextInput";
import Icon from "react-native-vector-icons/Ionicons";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Api from "../../../Api";
import { useAuth } from "../../../contexts/AuthContext";

GoogleSignin.configure({
    profileImageSize: 120,
    webClientId: '90723732678-so0gstv23t7g9ejgaj3c6un1rdpk3kn5.apps.googleusercontent.com',
});

function FirstTime(props: any)
{
    const [email, setEmail] = useState('')
    const auth = useAuth()

    async function connectWithGoogle()
    {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            const api = await Api()
            const {data} = await api.post('/auth/google-signin', {code: userInfo.serverAuthCode})
            console.log(data)
            if (data.type == 'signin') {
                // sign in
                const {data: {token: clientToken}} = await api.get('/auth/generate-device-token', {
                    headers: {
                        Authorization: 'Bearer ' + data.token
                    }
                })
                auth.signIn(data.user, data.token, clientToken)
            } else if (data.type == 'continue-signup') {
                props.navigation.push('SignUp', {defaultValue: data, email: data.email})
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    return <FirstTimePageContainer
        source={require('../../../assets/background.png')}
        resizeMode="cover"
        style={{backgroundColor: '#3F0BAD'}}
    >
        <SafeAreaView style={{flex: 1, paddingHorizontal: 30}}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
                <View style={{flex: 0.25, padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../../assets/logo-default.png')} style={{width: 200, height: 33}} />
                </View>
                <View style={{flex: 0.75, justifyContent: 'center'}}>
                    <FirstTimeTitle>Uma <FirstTimeTitle style={{fontWeight: '800'}}>sintonia astrológica</FirstTimeTitle> não tem quem separe!</FirstTimeTitle>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <TextInput
                        label="E-mail"
                        labelColor="#FFF"
                        autoCapitalize="none"
                        autoComplete="email"
                        textContentType="emailAddress"
                        placeholder="Ex.: andres@skymatch.com"
                        onChangeText={setEmail}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <FirstTimeButton onPress={() => props.navigation.push('SignUp', {email})} style={{width: '49%'}}>
                            <FirstTimeButtonText style={{color: '#3F0BAD'}}>Criar conta</FirstTimeButtonText>
                        </FirstTimeButton>
                        <FirstTimeButton
                            onPress={() => props.navigation.push('SignIn', {email})}
                            style={{width: '49%'}}
                            color="#DA326C"
                        >
                            <FirstTimeButtonText style={{color: '#FFF'}}>Entrar</FirstTimeButtonText>
                        </FirstTimeButton>
                    </View>
                    <FirstTimeOrText>ou</FirstTimeOrText>
                    {Platform.OS === 'ios' && <FirstTimeButton>
                        <Icon name="logo-apple" size={32} />
                        <FirstTimeButtonText>Continue com Apple</FirstTimeButtonText>
                    </FirstTimeButton>}
                    <FirstTimeButton onPress={connectWithGoogle}>
                        <Icon name="logo-google" size={32} />
                        <FirstTimeButtonText>Continue com Google</FirstTimeButtonText>
                    </FirstTimeButton>
                    <PolicyMessage>Ao clicar em Criar Conta ou Entrar, você concorda com nossos termos.</PolicyMessage>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    </FirstTimePageContainer>
}

export default FirstTime;