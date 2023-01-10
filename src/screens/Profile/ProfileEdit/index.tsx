import React, { useRef } from "react";
import { AuthButton, AuthButtonText } from "../../Auth/style";
import { AuthGenderInput, AuthImagePicker, AuthRangeInput, TextInput as AuthTextInput } from "../../../components/AuthInputs";
import styled from "styled-components";
import Icon from 'react-native-vector-icons/Ionicons'
import { useAuth } from "../../../contexts/AuthContext";
import * as Yup from 'yup';
import Api, { API_BASE_URL } from "../../../Api";
import { Platform, View } from "react-native";
import catchApiError from "../../../hooks/catchApiError";
import Toast from "react-native-toast-message";
import { Formik } from "formik";
import { camelToSnakeCase } from "../../Auth/SignUp";

export const ProfileEditPageContainer = styled.ScrollView`
    flex: 1;
    background-color: #3F0BAD;
`

function ProfileEdit(props: any)
{
    const formRef = useRef<any>(null)
    const authContext = useAuth()

    const initialData = {
        profilePhoto: {type: 'url', uri: API_BASE_URL + '/uploads/' + authContext.user.profile_photo}, 
        name: authContext.user.name,
        biography: authContext.user.biography,
        gender: authContext.user.gender,
        prefferedGenders: typeof(authContext.user.preffered_genders) == 'string' ? JSON.parse(authContext.user.preffered_genders) : authContext.user.preffered_genders,
        maxDistanceRadar: authContext.user.max_distance_radar,
        prefferedAgeInterval: [authContext.user.preffered_min_age, authContext.user.preffered_max_age],
    }

    async function handleSubmit(data: any, setErrors: any)
    {
        console.log(data)
        try {
            const schema = Yup.object().shape({
                name: Yup.string().min(3, 'Digite um nome de ao menos 3 caracteres.').required('Este campo é obrigatório.'),
                biography: Yup.string().min(6, 'A biografia deve conter ao menos 6 caracteres.').required('Este campo é obrigatório.'),
                gender: Yup.string().required('Selecione seu gênero.').oneOf(['male', 'female'], 'Você deve escolher um gênero válido.'),
                prefferedGenders: Yup.array().of(Yup.string().oneOf(['male', 'female'], 'Selecione um gênero válido.')).required('Selecione ao menos um gênero.'),
                maxDistanceRadar: Yup.number().positive().required('Este campo é obrigatório.').max(100),
                prefferedAgeInterval: Yup.array().of(Yup.number().positive().min(18, 'A idade mínima é 18 anos.').max(100, 'A idade máxima é 100 anos.')),
                profilePhoto: Yup.array().of(Yup.object().required('A foto de perfil é obrigatória.').shape({
                    uri: Yup.string(),
                    type: Yup.string(),
                    fileName: Yup.string()
                }))
            })
            await schema.validate(data, {abortEarly: false})
            if (data.profilePhoto && data.profilePhoto.type === 'url') {
                delete data.profilePhoto
            }
 
            const formData = new FormData()
            console.log(data)
            for (const i in data) {
                if (i === 'profilePhoto') {
                    for (const p of data[i]) formData.append('profile_photo', p)
                } else {
                    formData.append(camelToSnakeCase(i), typeof(data[i]) !== 'string' ? JSON.stringify(data[i]) : data[i])
                }
            }
            const api = await Api()
            const {data: user} = await api.patch('/profile', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            authContext.setUser(user)

            Toast.show({type: 'success', text1: 'Perfil atualizado!'})
            props.navigation.navigate('Profile')
        } catch (err: any) {
            console.log(err, err.message)
            if (err.isAxiosError) {
                catchApiError(err)
            }
            if (err.inner) {
                setErrors(Object.fromEntries(err.inner.map(error => [error.path, error.message])))
            }
            if (err instanceof Yup.ValidationError) {
                Toast.show({type: 'error', text1: 'Verifique suas informações.', text2: err.inner.map(error => error.path).join(', ')})
                console.log(err.inner)
            }
        }
    }

    return <ProfileEditPageContainer style={{paddingHorizontal: 0}}>
        <Formik initialValues={initialData} ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
            {({setErrors, values}) => <View style={{width: '100%', padding: 25}}>
                <AuthImagePicker
                    label="Foto de perfil"
                    name="profilePhoto"
                />
                <AuthTextInput
                    label="Nome completo"
                    placeholder="Ex.: José Silva"
                    name="name"
                />
                <AuthTextInput
                    label="Biografia"
                    placeholder="Escreva sobre você..."
                    name="biography"
                />
                <AuthGenderInput
                    name="gender"
                    label="Seu gênero"
                />
                <AuthGenderInput
                    name="prefferedGenders"
                    label="Sua preferência"
                    multiple={true}
                />
                <AuthRangeInput
                    name="maxDistanceRadar"
                    label="Preferência de distância máxima"
                    valueType="km"
                />
                <AuthRangeInput
                    name="prefferedAgeInterval"
                    label="Preferência de idade"
                    multiple={true}
                    step={0.01}
                    minimumValue={0.18}
                    maximumValue={1}
                    valueType=" anos"
                />
                <AuthButton onPress={() => handleSubmit(values, setErrors)}>
                    <Icon name="checkmark" size={18} color="#FFF" />
                    <AuthButtonText>Salvar</AuthButtonText>
                </AuthButton>
            </View>}
        </Formik>
    </ProfileEditPageContainer>
}

export default ProfileEdit;