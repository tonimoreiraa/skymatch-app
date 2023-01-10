import React from "react";
import { RefreshControl, View } from "react-native";
import Swipeout from "react-native-swipeout";
import Api, { API_BASE_URL } from "../../Api";
import { LikeType } from "../../types/LikeTypes";
import { ProfilePhoto } from "../Profile/style";
import { LikeCompatibility, LikeContainer, LikeProfileName, LikesPageContainer } from "./style";
import {Toast} from "react-native-toast-message/lib/src/Toast";
import { Title } from "../../components/Texts";
// import LikesImage from '../../assets/loving-it.svg';
import { Button, ButtonText } from "../../components";

class Likes extends React.Component
{
    state: {refreshing: boolean, likes: LikeType[]} = {refreshing: false, likes: []}

    async componentDidMount() {
        await this.loadLikes()
    }

    async loadLikes() {
        this.setRefresh(true)
        const {data: likes} = await (await Api()).get('/likes')
        this.setState({likes, refreshing: false})
    }

    setRefresh = (refreshing: boolean) => this.setState({...this.state, refreshing})

    async handleDelete(like: LikeType) {
        (await Api()).delete('/likes/' + like.id).then(() => {
            Toast.show({type: 'info', text1: 'Like deletado com sucesso'})
            this.setState({...this.state, likes: this.state.likes.filter(l => like.id != l.id)})
        }).catch(e => Toast.show({type: 'error', text1: 'Falha ao deletar like.'}))    
    }

    render() {
        const {likes} = this.state
        return likes.length ? <LikesPageContainer refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.loadLikes()} />}>
            {likes.map(like => <LikeContainer key={like.id}>
                <ProfilePhoto style={{width: 80, height: 80}} source={{uri: API_BASE_URL + '/uploads/' + like.profile_photo}} />
                <View style={{marginLeft: 10}}>
                    <LikeProfileName>{like.name}</LikeProfileName>
                    <LikeCompatibility>{like.compatibility}% de compatibilidade</LikeCompatibility>
                </View>
            </LikeContainer>)}
        </LikesPageContainer> : <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5}}>
            {/* <LikesImage width={200} height={200} /> */}
            <Title style={{textAlign: 'center', marginTop: 5}}>Você ainda não favoritou nenhuma pessoa.</Title>
            <Button style={{marginTop: 5}} onPress={this.loadLikes.bind(this)}>
                <ButtonText>Tentar novamente</ButtonText>
            </Button>
        </View>
    }
}

export default Likes;