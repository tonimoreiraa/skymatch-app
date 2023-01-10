export type ZodiacNames = 'aries'|'taurus'|'gemini'|'cancer'|'leo'|'virgo'|'libra'|'scorpio'|'sagittarius'|'capricorn'|'aquarius'|'pisces'
export interface UserType {
    id: number,
    name: string,
    email: string,
    biography?: string,
    profile_photo: string[],
    gender: string,
    birth_date: Date,
    sun: number,
    sun_name: ZodiacNames,
    moon: number,
    moon_name: ZodiacNames,
    ascendant: number,
    ascendant_name: ZodiacNames,
    preffered_genders: ('male'|'female')[],
    max_distance_radar: number,
    preffered_min_age: number,
    preffered_max_age: number
}