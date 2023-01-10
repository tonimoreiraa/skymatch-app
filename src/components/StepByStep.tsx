import React, { useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthButton, AuthButtonBack, AuthButtonBackText, AuthButtonText } from "../screens/Auth/style";

type ContainerProps = {
    children: any[],
    validate?: (step: number, currentStep: number, next: boolean) => Promise<boolean>,
    handleSubmit?: () => void
}

function Container({validate, handleSubmit, ...props}: ContainerProps)
{
    const steps = props.children.map((step, index) => ({
        index: index + 1,
        element: step.props.children
    }))
    const [currentStep, setCurrentStep] = useState(1)

    async function changeStep(step: number)
    {
        if (validate && !await validate(step, currentStep, step - currentStep >= 0)) {
            return false
        }
        if (step > steps.length || step <= 0) return false

        setCurrentStep(step)
    }

    const backStep = () => changeStep(currentStep - 1)
    const nextStep = () => changeStep(currentStep + 1)

    return <View style={{flexDirection: 'column'}}>
        {props.children.map((v, i) => <View key={i} style={i === currentStep - 1 ? {} : {display: 'none'}}>{v}</View>)}
        <View style={{flexDirection: 'row'}}>
            {currentStep != 0 && <AuthButtonBack onPress={backStep}>
                <Icon name="arrow-back" size={18} color="#000" />
                <AuthButtonBackText>Voltar</AuthButtonBackText>
            </AuthButtonBack>}
            <AuthButton onPress={currentStep == 6 ? handleSubmit ?? (() => {}) : nextStep}>
                <Icon name={currentStep == 6 ? 'checkmark' : 'arrow-forward'} size={18} color="#FFF" />
                <AuthButtonText>{currentStep == 6 ? 'Criar conta' : 'Continuar'}</AuthButtonText>
            </AuthButton>
        </View>
    </View>
}

type StepProps = {
    children: React.ReactNode
}

function Step(props: StepProps)
{
    return <>{props.children}</>
}

const StepByStep = {Container, Step}

export default StepByStep;