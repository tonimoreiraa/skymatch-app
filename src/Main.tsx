import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { PermissionsAndroid, Platform, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from "./components/Texts";
import { useAuth } from "./contexts/AuthContext";
import { SocketContextProvider } from "./contexts/SocketContext";
import FirstTime from "./screens/Auth/FirstTime";
import SignIn from "./screens/Auth/SignIn";
import SignUp from "./screens/Auth/SignUp";
import Chat from "./screens/Chat";
import Chats from "./screens/Chats";
import Feed from "./screens/Feed";
import Likes from "./screens/Likes";
import Profile from "./screens/Profile";
import ProfileEdit from "./screens/Profile/ProfileEdit";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Geolocation from "@react-native-community/geolocation";
import Api from "./Api";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export const tabBarActiveTintColor = '#3F0BAD'

const icon = (iconName: string) => (tabInfo: any) => <Ionicons
    name={iconName + (tabInfo.focused ? '' : '-outline')}
    color={tabInfo.focused ? tabBarActiveTintColor : '#999'}
    size={24}
/>

function ProfileRoutes() {
    return <Stack.Navigator
        screenOptions={{headerShown: true}}
        initialRouteName="Profile"
    >
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false, title: 'Perfil'}} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{title: 'Editar perfil', headerTintColor: '#FFF', headerStyle: {backgroundColor: '#3F0BAD'}}} />
    </Stack.Navigator>
}

function ChatsRoutes() {
    return <Stack.Navigator
        screenOptions={{headerShown: true}}
        initialRouteName="Chats"
    >
        <Stack.Screen name="Chats" component={Chats} options={{title: 'Conversas'}} />
        <Stack.Screen name="Chat" component={Chat} options={{title: 'Chat'}} />
    </Stack.Navigator>
}

export default function Main()
{
    const {authenticated} = useAuth()

    const callLocation = () => {
        if(Platform.OS === 'ios') {
            getLocation()
        } else {
            const requestLocationPermission = async () => {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Permissão de Acesso à Localização",
                message: "Precisamos obter sua localização para buscar pessoas próximas à você!.",
                buttonNeutral: "Pergunte-me depois",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
            }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getLocation()
            } else {
                Toast.show({type: 'error', text1: 'Não é possível coletar localização do usuário.', text2: 'Permissão negada.'})
            }
        }
            requestLocationPermission()
        }
    }
    
    const getLocation = () => {
        Geolocation.getCurrentPosition(
        async (position) => {
            const latitude = JSON.stringify(position.coords.latitude)
            const longitude = JSON.stringify(position.coords.longitude)
            console.log(latitude, longitude)
            await (await Api()).patch('/profile', {latitude, longitude})
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 20000 })
    }

    useEffect(() => {
        if (authenticated) callLocation()
    }, [authenticated])

    return authenticated ? <SocketContextProvider>
        <Tab.Navigator screenOptions={{tabBarActiveTintColor}}>
            <Tab.Screen name="Descobrir" component={Feed} options={{tabBarIcon: icon('compass'), headerShown: false}} />
            <Tab.Screen name="Likes" component={Likes} options={{tabBarIcon: icon('heart')}} />
            <Tab.Screen name="Conversas" component={ChatsRoutes} options={{tabBarIcon: icon('chatbubble'), headerShown: false}} />
            <Tab.Screen name="Eu" component={ProfileRoutes} options={{tabBarIcon: icon('person'), headerShown: false}} />
        </Tab.Navigator>
    </SocketContextProvider>
    : <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="FirstTime"
    >
        <Stack.Screen name="FirstTime" component={FirstTime} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
}
