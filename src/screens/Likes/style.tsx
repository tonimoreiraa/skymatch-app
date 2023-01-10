import styled from "styled-components";
import { tabBarActiveTintColor } from "../../Main";

export const LikesPageContainer = styled.ScrollView`
    flex: 1;
    padding: 20px;
`

export const LikeContainer = styled.View`
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    background-color: #fff;
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center;
    justify-content: flex-start;
`

export const LikeProfileName = styled.Text`
    font-size: 16px;
    font-weight: 600;
`

export const LikeCompatibility = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: ${tabBarActiveTintColor};
`