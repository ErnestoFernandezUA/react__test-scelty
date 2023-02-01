import { FormObject, Keys } from '../../type/FormObject';

export const validData: FormObject<Keys, string[]> = {
  carBrand: ['Audi', 'BMW', 'Nissan'],
  zipCode: ['65000', '66000', '67000', '68000'],
};
