import React from "react";
import Api from "../../Api";
import FeedSugestion from "../../components/FeedSugestion";
import { UserType } from "../../types/UserTypes";
import Toast from 'react-native-toast-message';
import { ActivityIndicator, View } from "react-native";
import { Title } from "../../components/Texts";
import { Button, ButtonText } from "../../components";
import { PageContainer } from "./style";
import { Image } from "react-native";
import NotFoundImage from '../../assets/not-found.svg'
class Feed extends React.Component
{
    state: {user?: UserType & {compatibility: number, distance: number}, noUsers: boolean} = {noUsers: false}

    constructor(props: any) {
        super(props)
        this.markAsViewed = this.markAsViewed.bind(this)
        this.loadProfile = this.loadProfile.bind(this)
    }

    componentDidMount() {
        this.loadProfile()
    }

    async markAsViewed(targetId: number) {
        return (await Api()).post(`/feed/${targetId}/mark-viewed`)
    }

    async loadProfile() {
        if (this.state.user) {
            await this.markAsViewed(this.state.user.id)
        }
        const {data: user} = await (await Api()).get('/feed/random')
        if (!user) {
            this.setState({...this.state, user: undefined, noUsers: true})
            return Toast.show({type: 'error', text1: 'Não há usuários disponíveis.'})
        }

        this.setState({...this.state, user, noUsers: false})
    }

    render() {
        const {user, noUsers} = this.state
        console.log(user)
        return <PageContainer>
            <View style={{width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../assets/logo-pink.png')} style={{width: 150, height: 24.75}} />
            </View>
            {noUsers ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5}}>
                <NotFoundImage width={200} height={200} />
                <Title style={{textAlign: 'center', }}>Não há usuários disponíveis.</Title>
                <Button style={{marginTop: 5}} onPress={this.loadProfile}>
                    <ButtonText>Tentar novamente</ButtonText>
                </Button>
            </View> : user ? <FeedSugestion handleNext={this.loadProfile} {...user} /> : <ActivityIndicator />}
        </PageContainer>
    }
}

export default Feed;