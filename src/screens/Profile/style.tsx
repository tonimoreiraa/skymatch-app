import styled from "styled-components";

export const ProfilePageContainer = styled.View`
    flex: 1;
    align-items: center;
`

export const ProfilePhoto = styled.Image`
    width: 250px;
    height: 250px;
    border-radius: 150px;
    background-color: #e6e6e6;
    border: 5px solid #fff;
`

export const UserDescription = styled.Text`
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    padding-horizontal: 10px;
    text-align: center;
    color: #FFF;
`

export const ProfileDetaisContainer = styled.SafeAreaView`
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #EB459F;
    padding: 25px;
`