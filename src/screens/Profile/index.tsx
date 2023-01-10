import React from "react";
import { Alert, Image, View } from "react-native";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileDetaisContainer, ProfilePageContainer, ProfilePhoto, UserDescription } from "./style";
import Icon from 'react-native-vector-icons/Ionicons';
import { Title } from "../../components/Texts";
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightColorsByZodiac, zodiacNames } from "../../Zodiac";
import { UserType } from "../../types/UserTypes";
import { ZodiacNames } from "../../types/UserTypes";
import AscendantImage from "../../assets/ascendant.svg";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { API_BASE_URL } from "../../Api";

const ActionContainer = styled.TouchableOpacity`
    width: 100%;
    padding: 10px 15px;
    border-radius: 6px;
    background-color: #3F0BAD;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
`

const ZodiacContainer = styled.View<{zodiac: ZodiacNames}>`
    flex: 1;
    border-radius: 6px;
    padding: 10px;
    margin: 5px;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => lightColorsByZodiac[props.zodiac]};
`

const LocationContainer = styled.View`
    width: 100%;
    border-radius: 6px;
    padding: 10px 15px;
    margin-vertical: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: #3F0BAD;
`

const LocationName = styled.Text`
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    flex: 1;
    color: #FFF;
`

const ZodiacName = styled.Text`
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    color: #000;
`

class Profile extends React.Component<{navigation: any}>
{
    static contextType = AuthContext

    logout() {
        Alert.alert(
            'Desconectando',
            'Você tem certeza que deseja sair da sua conta?',
            [
                {
                    text: "Sair",
                    onPress: () => this.context.signOut()
                },
                {
                    text: "Cancelar",
                    style: "cancel",
                }
            ],
        )
    }

    render() {
        const userData: UserType = this.context.user
        console.log(userData)
        return <ProfilePageContainer>
            <ProfileDetaisContainer>
                <View style={{width: '100%', marginBottom: 10, paddingHorizontal: 25, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <View style={{width: 36}}></View>
                    <Image source={require('../../assets/logo-white.png')} style={{width: 200, height: 33}} />
                    <TouchableOpacity onPress={this.logout.bind(this)}>
                        <Icon name="exit-outline" color="#FFF" size={36} />
                    </TouchableOpacity>
                </View>
                
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{ width: `${100 * userData.profile_photo.length}%` }}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    decelerationRate="fast"
                    pagingEnabled
                >
                    {userData.profile_photo.map(p => <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <ProfilePhoto source={{uri: API_BASE_URL + '/uploads/' + p}} />
                    </View>)}
                </ScrollView>
                <Title style={{textAlign: 'center', color: '#FFF'}}>{userData.name}</Title>
                <UserDescription>{userData.email}</UserDescription>
                <UserDescription>{userData.biography}</UserDescription>
            </ProfileDetaisContainer>
            <View style={{padding: 25}}>
                <View style={{flexDirection: 'row'}}>
                    <ZodiacContainer zodiac={userData.sun_name}>
                        <Icon name="sunny" size={14} style={{alignSelf: 'flex-end'}} />
                        <MaterialIcons name={'zodiac-' + userData.sun_name} size={64} />
                        <ZodiacName>{zodiacNames[userData.sun_name]}</ZodiacName>
                    </ZodiacContainer>
                    <ZodiacContainer zodiac={userData.ascendant_name}>
                        <AscendantImage style={{width: 14, height: 14, alignSelf: 'flex-end'}} />
                        <MaterialIcons name={'zodiac-' + userData.ascendant_name} size={64} />
                        <ZodiacName>{zodiacNames[userData.ascendant_name]}</ZodiacName>
                    </ZodiacContainer>
                    <ZodiacContainer zodiac={userData.moon_name}>
                        <Icon name="moon" size={14} style={{alignSelf: 'flex-end'}} />
                        <MaterialIcons name={'zodiac-' + userData.moon_name} size={64} />
                        <ZodiacName>{zodiacNames[userData.moon_name]}</ZodiacName>
                    </ZodiacContainer>
                </View>
                <LocationContainer>
                    <Icon name="location" size={24} color="#FFF" />
                    <LocationName>{userData.city?.name}, {userData.city?.state}, {userData.city?.country}</LocationName>
                </LocationContainer>
                <ActionContainer onPress={() => this.props.navigation.navigate('ProfileEdit')}>
                    <Icon name="pencil" size={24} color="#FFF" />
                    <LocationName>Editar perfil</LocationName>
                </ActionContainer>
            </View>
        </ProfilePageContainer>
    }
}

export default Profile;