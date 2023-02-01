import { FormObject, Keys } from "../../type/FormObject";

export const validationObject = (
  value: FormObject<Keys, string>,
  key:string,
  ):{applyRules: boolean, wrongMessage: string}[] => {
  switch (key) {
    case 'carBrand':
      return [
        {
          applyRules: true,
          wrongMessage: `${key} is required!`,
        },
        { applyRules: true,
          wrongMessage: `The brand ${value[key]!.toUpperCase() || 'NO_VALUE'} is unfortunately not serviced.`
        },
      ];

    case 'zipCode':
      return [
        {
          applyRules: true,
          wrongMessage: `${key} is required!`,
        },
        { applyRules: true,
          wrongMessage: `Postal code ${value[key]!.toUpperCase() || 'NO_VALUE'} is unfortunately not serviced.`,
        },
      ];

    default:
      return [
        {
          applyRules: true,
          wrongMessage: `${key} is required!`,
        },
        { 
          applyRules: false,
          wrongMessage: '',
        },
      ];
  }
};