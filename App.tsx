import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './src/contexts/AuthContext'
import Main from './src/Main';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';

function App()
{
    return <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
            <AuthContextProvider>
                <Main />
                <Toast />
            </AuthContextProvider>
        </NavigationContainer>
    </GestureHandlerRootView>
}

export default App;