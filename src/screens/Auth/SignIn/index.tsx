import React, { useEffect, useRef } from "react";
import { AuthButton, AuthButtonText, AuthPageContainer, AuthTitle } from "../style";
import Api from "../../../Api";
import catchApiError from "../../../hooks/catchApiError";
import { useAuth } from "../../../contexts/AuthContext";
import { View } from "react-native";
import { TextInput as AuthTextInput } from "../../../components/AuthInputs";
import * as Yup from 'yup';
import { Formik } from "formik";
import { useRoute } from "@react-navigation/native";

function SignIn() {

    const authContext = useAuth()
    const {params} = useRoute()

    async function handleSubmit(data: any, setErrors: any) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('Digite um e-mail válido.').required('Este campo é obrigatório.'),
                password: Yup.string().min(6, 'A senha deve ter ao menos 6 caracteres.').required('Este campo é obrigatório.')
            })
            await schema.validate(data, { abortEarly: false })

            const api = await Api()
            const {data: res} = await api.post('/auth/login', data)
            const {data: {token: clientToken}} = await api.get('/auth/generate-device-token', {
                headers: {
                    Authorization: 'Bearer ' + res.token
                }
            })
            authContext.signIn(res.user, res.token, clientToken)
        } catch (err: any) {
            if (err.isAxiosError) {
                catchApiError(err.response)
            }
            if (err instanceof Yup.ValidationError) {
                setErrors(Object.fromEntries(err.inner.map(e => [e.path, e.message])))
            }
        }
    }

    return <AuthPageContainer>
        <Formik initialValues={{...params}} onSubmit={handleSubmit}>
            {({values, setErrors }) => <>
                <AuthTitle>Entrar</AuthTitle>
                <AuthTextInput
                    label="E-mail"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Ex.: example@example.com"
                    name="email"
                />
                <AuthTextInput
                    label="Senha"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="••••••••••••"
                    name="password"
                />
                <View style={{flexDirection: 'row'}}>
                    <AuthButton onPress={() => handleSubmit(values, setErrors)}>
                        <AuthButtonText>Entrar</AuthButtonText>
                    </AuthButton>
                </View>
            </>}
        </Formik>
    </AuthPageContainer>
}

export default SignIn;