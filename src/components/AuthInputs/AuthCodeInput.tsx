import { useField } from "formik";
import React from "react";
import { View } from "react-native";
import { CodeInput } from "../../screens/Auth/style";
import { Error } from "./style";

function AuthCodeInput({name}: {name: string})
{
    const [field, meta, helpers] = useField(name)
    const { value } = meta
    const { setValue } = helpers

    return <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        <CodeInput maxLength={6} value={value} keyboardType="numeric" onChangeText={setValue} />
        {!!meta.error && <Error>{meta.error}</Error>}
    </View>
}

export default AuthCodeInput;