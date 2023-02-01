export type Keys = 'carBrand' | 'zipCode' | 'firstName' | 'lastName' | 'carModel' | 'firstRegistration';

export type FormObject<K extends Keys, T> = {[key in K]?: T};
