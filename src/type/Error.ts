export type KeysForm1 = 'carBrand' | 'zipCode';
export type Error1 = {[key in KeysForm1]: string[]};
export type ValidData1 = {[key in KeysForm1]: string[]};
export type ValueForm1 = {[key in KeysForm1]: string};


export type KeysForm2 = 'firstName' | 'lastName' | 'carModel' | 'firstRegistration';
export type ValueForm2 = {[key in KeysForm2]: string};
export type ValidData2 = {[key in KeysForm2]: string[]};
export type Error2 = {[key in KeysForm2]: string[]};


export type KeysForm = 'carBrand' | 'zipCode' | 'firstName' | 'lastName' | 'carModel' | 'firstRegistration';
export type Value<K extends KeysForm, T> = {[key in K]?: T};
export type ValueForm = Value<KeysForm, string> //{[key in KeysForm]?: string};
export type ErrorType = Value<KeysForm, string[]>//{[key in KeysForm]?: string[]};
export type ValidData = Value<KeysForm, string[]> //{[key in KeysForm]?: string[]};

export type InputsType<T> = Value<KeysForm, T>