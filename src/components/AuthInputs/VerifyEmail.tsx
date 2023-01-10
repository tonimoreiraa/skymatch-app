import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../Texts";

export default function VerifyEmail(props: {email: string})
{
    const [email, setEmail] = useState()

    useEffect(() => {
        setEmail(props.email)
    }, [props.email])

    return <View>
        <Text>Confirme seu e-mail: </Text>
    </View>
}