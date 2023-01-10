import { Slider } from "@miblanchard/react-native-slider";
import { SliderProps } from "@miblanchard/react-native-slider/lib/types";
import { useField } from "formik";
import React, { useEffect } from "react";
import { Error, InputContainer, Label } from "./style";

function AuthRangeInput({name, label, multiple = false, valueType, defaultValue, ...rest}: Partial<SliderProps> & {name: string, label: string, multiple?: boolean, valueType?: string, defaultValue?: any})
{
    const [field, meta, helpers] = useField(name)
    const { value } = meta
    const { setValue } = helpers

    useEffect(() => {
        if (!value && defaultValue) setValue(defaultValue)
    }, [defaultValue])


    return <InputContainer>
        {!!label && <Label>{label} ({Array.isArray(value) ? value.map(i => (i).toFixed(0) + (valueType ?? '')).join(' - ') : (value ?? 0) + (valueType ?? '')})</Label>}
        <Slider
            value={value ? (multiple ? value.map((i: number) => i/100) : value/100) : undefined}
            onValueChange={(v) => setValue(Array.isArray(v) && multiple ? v.map((i: number) => Math.trunc(i*100)) : Math.trunc(v*100))}
            thumbTintColor="#DA326C"
            minimumTrackTintColor="#FFF"
            {...rest}
        />
        {!!meta.error && <Error>{meta.error}</Error>}
    </InputContainer>
}

export default AuthRangeInput;