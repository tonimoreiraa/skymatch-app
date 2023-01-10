import * as Yup from 'yup';

export const SignUpValidators = [
    Yup.object().shape({
        email: Yup.string().email().required(),
        name: Yup.string().min(3).required(),
        biography: Yup.string().min(4).required(),
        password: Yup.string().min(6).required()
    }),
    Yup.object().shape({
        gender: Yup.string().oneOf(['male', 'female']),
        prefferedGenders: Yup.array().of(Yup.string().oneOf(['male', 'female'])).min(1).max(2)
    }),
    Yup.object().shape({
        maxDistanceRadar: Yup.number().min(1).max(100),
        prefferedAgeInterval: Yup.array().of(Yup.number())
    }),
    Yup.object().shape({
        birthTime: Yup.date()
        .max(new Date(Date.now() - 567648000000), 'Você deve ser maior de idade.')
        .required(),
        country: Yup.string().required(),
        state: Yup.string().required(),
        birthCityId: Yup.number().required()
    }),
    Yup.object().shape({profilePhoto: Yup.array().required()})
]