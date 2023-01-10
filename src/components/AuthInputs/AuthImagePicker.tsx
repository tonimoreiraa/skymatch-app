import React, { useEffect } from "react";
import * as ImagePicker from 'react-native-image-picker';
import { ProfilePhoto } from "../../screens/Auth/style";
import styled from "styled-components";
import { Text } from "../Texts";
import { Alert, Platform, ScrollView, View } from "react-native";
import { Error, InputContainer, Label } from "./style";
import Icon from 'react-native-vector-icons/Ionicons'
import { useField } from "formik";

const TouchableOpacity = styled.TouchableOpacity`
    width: 100%;
    align-items: center;
    justify-content: center;
`

function AuthImagePicker({name, label, defaultValue}: & {name: string, label?: string, defaultValue?: any})
{
    const [field, meta, helpers] = useField(name)
    const { value } = meta
    const { setValue } = helpers

    useEffect(() => {
        if (!value && defaultValue) setValue(defaultValue)
    }, [defaultValue])

    async function handleChangeImage()
    {
        const result = await ImagePicker.launchImageLibrary({mediaType: 'photo', selectionLimit: 6 - (value?.length || 0), quality: 0.7})
        if (!result.assets) return
        setValue([...(value ?? []), ...result.assets.map(image => ({
            name: image.fileName,
            type: image.type,
            uri: Platform.OS === 'ios' ? image.uri?.replace('file://', '') : image.uri
        }))])
    }

    const photos = value ? (Array.isArray(value) ? value : [value]) : undefined

    const handleDeleteImage = (key: number) => {
        Alert.alert('Deletar imagem', 'Você tem certeza que quer deletar essa imagem?', [
            {
                text: "DELETAR",
                onPress: () => setValue(value.filter((_: any, k: number) => k !== key)),
            },
            {text: "Cancelar"}
        ])
        
    }

    return <InputContainer value={value}>
        {!!label && <Label>{label}</Label>}
        <View>
            <ScrollView horizontal={true}>
                {photos && photos.map((image: any, k) => <TouchableOpacity style={{flex: 1, marginRight: 3}} onPress={() => handleDeleteImage(k)}>
                    <ProfilePhoto key={image.uri} source={{uri: image ? image.uri : undefined}} />
                </TouchableOpacity>)}
            </ScrollView>
            <TouchableOpacity onPress={handleChangeImage}> 
                <View style={{width: '100%', height: 25, marginTop: 5, borderRadius: 6, backgroundColor: 'rgba(255,255,255, 0.15)', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <Icon name="camera" size={24} color="white" />
                    <Icon name="add" size={20} color="white" />
                </View>
            </TouchableOpacity>
        </View>
        {!!meta.error && <Error>{meta.error}</Error>}
    </InputContainer>
}

export default AuthImagePicker;