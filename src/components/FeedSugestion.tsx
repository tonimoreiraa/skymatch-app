import React from "react";
import { View, Vibration } from "react-native";
import styled from "styled-components";
import { CircleButton, CircleButtonLight, SubTitle2, Title } from "./Texts";
import Icon from 'react-native-vector-icons/Ionicons';
import { UserType } from "../types/UserTypes";
import Api, { API_BASE_URL } from "../Api";
import Toast from "react-native-toast-message";
import catchApiError from "../hooks/catchApiError";
import { ScrollView } from "react-native-gesture-handler";

const Container = styled.View`
    flex: 1;
    background-color: #F0EEEE;
    margin: 20px;
    border-radius: 12px;
`

const Image = styled.Image`
    flex: 1;
    border-radius: 8px;
    background-color: gray;
`

const TextArea = styled.View`
    flex: 0.5;
    align-items: center;
    justify-content: center;
`

const CompatibilityContainer = styled.View`
    padding: 6px 10px;
    background-color: #3F0BAD;
    border-radius: 8px;
    margin-bottom: 10px;
    margin-horizontal: 3px;
`

const CompatibilityText = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: #FFF;
`

function FeedSugestion(props: UserType & {compatibility: number, distance: number, handleNext: () => void})
{
    async function handleLike(like: boolean) {
        Vibration.vibrate()
        const req = (await Api()).post('/likes', {
            target_id: props.id,
            like
        }).then(() => props.handleNext()).catch(e => catchApiError(e))
    }

    return <Container>
        
        <ScrollView
            horizontal={true}
            contentContainerStyle={{ width: `${100 * props.profile_photo.length}%` }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled
        >
            {props.profile_photo.map(p => <Image key={p} source={{uri: API_BASE_URL + '/uploads/' + p}} />)}
        </ScrollView>
        <TextArea>
            <View style={{flexDirection: 'row'}}>
                <CompatibilityContainer>
                    <CompatibilityText>{Math.trunc(props.compatibility)}% de compatibilidade</CompatibilityText>
                </CompatibilityContainer>
                <CompatibilityContainer>
                    <CompatibilityText>{Math.trunc(props.distance)}km</CompatibilityText>
                </CompatibilityContainer>
            </View>
            <Title style={{color: '#3F0BAD'}}>{props.name}</Title>
            <SubTitle2 style={{color: '#3F0BAD'}}>{props.biography}</SubTitle2>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <CircleButtonLight onPress={() => handleLike(false)}>
                    <Icon name="close" size={20} />
                </CircleButtonLight>
                <CircleButton onPress={() => handleLike(true)}>
                    <Icon name="heart" size={20} color="#FFF" />
                </CircleButton>
                <CircleButtonLight onPress={props.handleNext}>
                    <Icon name="chevron-forward-outline" size={20} />
                </CircleButtonLight>
            </View>
        </TextArea>
    </Container>
}

export default FeedSugestion;