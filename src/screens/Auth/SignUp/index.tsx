import React, { useState } from "react";
import { AuthPageContainer, AuthSubTitle, AuthTitle } from "../style";
import { useRoute } from "@react-navigation/native";
import StepByStep from "../../../components/StepByStep";
import { TextInput, AuthGenderInput, AuthRangeInput, AuthDateTimePicker, AuthCityInput, AuthImagePicker, AuthCodeInput } from "../../../components/AuthInputs";
import { Text } from "../../../components/Texts";
import Api from "../../../Api";
import catchApiError from "../../../hooks/catchApiError";
import { TouchableOpacity, View } from "react-native";
import { SignUpValidators } from "../../../validators/SignUpValidator";
import { useAuth } from "../../../contexts/AuthContext";
import { Formik } from "formik";

export const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)

function SignUp()
{
    const {params} = useRoute()
    const authContext = useAuth()
    const [sendCode, setSendCode] = useState(false)

    async function sendVerificationCode(email: string)
    {
        try {
            await (await Api()).post('/users/validate-email', {email})
        } catch (e) {
            catchApiError(e)
        }
    }

    async function handleValidate(data: any, step: number, currentStep: number, setErrors: any)
    {
        if (step < currentStep) return true
        const schema = SignUpValidators[currentStep - 1]
        try {
            if (schema) await schema.validate(data, {abortEarly: false})
        } catch (err: any) {
            if (err.inner) {
                setErrors(Object.fromEntries(err.inner.map(error => [error.path, error.message])))
            }
            return false
        }

        if (step === 6 && !sendCode) {
            sendVerificationCode(data.email)
            setSendCode(true)
        } 

        return true
    }

    async function handleSubmitForm(data: any)
    {
        try {
            const formData = new FormData()
            for (const i in data) {
                if (i === 'profilePhoto') {
                    for (const p of data[i]) formData.append('profile_photo', p)
                } else if (i === 'birthTime') {
                    data.birthTime = new Date(data.birthTime)
                    data.birthTime = new Date(data.birthTime.getTime() - data.birthTime.getTimezoneOffset()*60*1000)
                    formData.append('birth_time', data.birthTime.toISOString())
                } else {
                    formData.append(camelToSnakeCase(i), typeof(data[i]) !== 'string' ? JSON.stringify(data[i]) : data[i])
                }
            }
            const api = await Api()
            const {data: registerData} = await api.post('/auth/register', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            const {data: deviceTokenData} = await api.get('/auth/generate-device-token', { headers: {Authorization: 'Bearer ' + registerData.token}})
            authContext.signIn(registerData.user, registerData.token, deviceTokenData.token)
        } catch (e) {
            console.log(e)
            catchApiError(e)
        }
    }

    return <Formik
        onSubmit={(data) => console.log(data)}
        initialValues={{
            prefferedAgeInterval: [18, 35],
            maxDistanceRadar: 0.08,
            gender: '',
            prefferedGenders: [],
            ...params
        }}>
        {({values, setErrors }) => (
            <AuthPageContainer>    
                <AuthTitle>Criar conta</AuthTitle>
                <StepByStep.Container handleSubmit={() => handleSubmitForm(values)} validate={(step: number, currentStep: number) => handleValidate(values, step, currentStep, setErrors)}>
                    <StepByStep.Step>
                        <TextInput
                            label="E-mail"
                            placeholder="Ex.: andres@skymatch.app"
                            name="email"
                            textContentType="emailAddress"
                        />
                        <TextInput
                            label="Nome completo"
                            placeholder="Ex.: José Silva"
                            name="name"
                            textContentType="name"
                        />
                        <TextInput
                            label="Biografia"
                            placeholder="Escreva sobre você..."
                            name="biography"
                            textContentType="jobTitle"
                        />
                        <TextInput
                            label="Senha"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder="••••••••"
                            name="password"
                            textContentType="newPassword"
                        />
                    </StepByStep.Step>
                    <StepByStep.Step>
                        <AuthGenderInput
                            name="gender"
                            label="Seu gênero"
                        />
                        <AuthGenderInput
                            name="prefferedGenders"
                            label="Sua preferência"
                            multiple={true}
                        />
                    </StepByStep.Step>
                    <StepByStep.Step>
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
                    </StepByStep.Step>
                    <StepByStep.Step>
                        <AuthDateTimePicker
                            label="Data e horário de nascimento"
                            name="birthTime"
                        />
                        <AuthCityInput values={values} />
                        <AuthSubTitle style={{marginTop: 20}}>Utilizamos estes dados para calcular a sua compatibilidade com outros usuários. Utilize sempre informações reais e precisas.</AuthSubTitle>
                    </StepByStep.Step>
                    <StepByStep.Step>
                        <AuthSubTitle>Selecione uma foto de perfil</AuthSubTitle>
                        <AuthImagePicker name="profilePhoto" />
                    </StepByStep.Step>
                    <StepByStep.Step>
                        <AuthSubTitle>Valide seu e-mail para criar uma conta na SkyMatch!</AuthSubTitle>
                        <AuthCodeInput name="code" />
                        <Text style={{color: '#FFF'}}>Não recebeu o código? <TouchableOpacity onPress={() => sendVerificationCode(values.email)}><Text style={{color: '#FFF'}}>Clique aqui para enviar novamente.</Text></TouchableOpacity></Text>
                    </StepByStep.Step>
                </StepByStep.Container>
        </AuthPageContainer>
        )}
    </Formik>
}

export default SignUp;