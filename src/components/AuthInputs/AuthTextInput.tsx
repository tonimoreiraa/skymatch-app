import { useField } from "formik"
import { TextInput, TextInputProps } from "react-native"
import { Error, Input as InputGenerator, InputContainer, Label } from "./style"

const Input = InputGenerator(TextInput)

export default function AuthTextInput({ name, label, defaultValue, labelColor, onChangeText, ...rest }: TextInputProps & {name: string, label: string, labelColor?: string})
{
    const [field, meta, helpers] = useField(name)
    const { value } = meta
    const { setValue } = helpers

    return <InputContainer>
        {!!label && <Label>{label}</Label>}
        <Input
            onChangeText={setValue}
            defaultValue={defaultValue}
            placeholderTextColor="#ffffff7e"
            value={value}
            {...rest}
        />
        {!!meta.error && <Error>{meta.error}</Error>}
    </InputContainer>
}