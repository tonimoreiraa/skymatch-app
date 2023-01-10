import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import Api from "../../Api";
import AuthSelectInput from "./AuthSelectInput";

function AuthCitySelector(props: any)
{
    const {country, state} = props.values
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState<any[]|undefined>(undefined)
    const [cities, setCities] = useState<any[]|undefined>(undefined)

    useEffect(() => {
        (async () => {
            const api = await Api()
            const {data: c} = await api.get('/locations/countries')
            setCountries(c)
        })()
    }, [])

    async function updateStatesList()
    {
        if (!country) return
        const api = await Api()
        const {data: s} = await api.get('/locations/states', {params: {country}})
        setStates(s)
    }

    async function updateCitiesList()
    {
        if (!country || !state) return
        const api = await Api()
        const {data: c} = await api.get('/locations/cities', {params: {country, state}})
        setCities(c)
    }

    return <>
        <AuthSelectInput
            name="country"
            label="País de nascimento"
            items={countries.map(country => ({label: country, value: country}))}
            onValueChange={() => {
                setStates(undefined)
                setCities(undefined)
                if (Platform.OS == 'android') updateStatesList()
            }}
            onDonePress={updateStatesList}
        />
        {states && <AuthSelectInput
            name="state"
            label="Estado de nascimento"
            items={states.map(state => ({label: state, value: state}))}
            onValueChange={() => {
                setCities(undefined)
                if (Platform.OS == 'android') updateCitiesList()
            }}
            onDonePress={updateCitiesList}
            onOpen={updateStatesList}
        />}
        {cities && <AuthSelectInput
            name="birthCityId"
            label="Cidade de nascimento"
            onOpen={updateCitiesList}
            items={cities.map((city: any) => ({label: city.name, value: city.id}))}
            onValueChange={() => {}}
        />}
    </>
}

export default AuthCitySelector;