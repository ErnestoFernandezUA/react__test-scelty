import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../..';
import { ValidData, ErrorType, FormObject, Keys, InputsType, 
} from '../../../type/FormObject';

const DELAY = 1000;

const validData: ValidData = {
  carBrand: ['Audi', 'BMW', 'Nissan'],
  zipCode: ['65000', '66000', '67000', '68000'],
}

const wrongMessageOBJ = (value: InputsType<string>, key:string):{applyRules: boolean, wrongMessage: string}[] => {
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

export interface InputState {
  storage: InputsType<string>,

  status: 'idle' | 'loading' | 'reject',
  errorMessage1: string,
  errorMessage2: string,
  validationFails: InputsType<string[]>,

  isCorrect: InputsType<boolean>,

  isCorrectDataForm1: boolean, 
  result: InputsType<string>,
}

const initialState: InputState = {
  storage: {
    carBrand: '',
    zipCode: '',
    firstName: '',
    lastName: '',
    carModel: '',
    firstRegistration: '',
  },

  status: 'idle',
  errorMessage1: '',
  errorMessage2: '',
  validationFails: {
    carBrand: [],
    zipCode: [],
    firstName: [],
    lastName: [],
    carModel: [],
    firstRegistration: [],
  },

  isCorrect: {
    carBrand: false,
    zipCode: false,
    firstName: false,
    lastName: false,
    carModel: false,
    firstRegistration: false,
  },

  isCorrectDataForm1: false, 
  result: {
    carBrand: '',
    zipCode: '',
    firstName: '',
    lastName: '',
    carModel: '',
    firstRegistration: '',
  }
};

export const validateAsync = createAsyncThunk(
  'inputs/validateFormAll',
  async (
      value:FormObject<Keys, string>,
    { rejectWithValue, getState },
    ) => {
    const state =  getState() as RootState;

    console.log('validateAsync// value:', value);

    try {
      const response: {
        success: boolean,
        fails: FormObject<Keys, string[]>,
        message: string,
      } = await new Promise(response => setTimeout(() => {
        let isValidInput = true;

        const fails: FormObject<Keys, string[]> = {
          ...state.inputs.validationFails,
        };

        for(const key in value){
          fails[key as keyof FormObject<Keys, string>] = [];

          if (!value[key as keyof FormObject<Keys, string>]
            && wrongMessageOBJ(value, key)[0].applyRules
            ){
            console.log(value[key as keyof FormObject<Keys, string>]);

            fails[key as keyof ErrorType] = [
              ...fails[key as keyof FormObject<Keys, string[]>]!,
               wrongMessageOBJ(value, key)[0].wrongMessage,
            ];

            isValidInput = false;
          }

          if (wrongMessageOBJ(value, key)[1].applyRules && !validData[key as keyof FormObject<Keys, string[]>]!
            .some((el: string) => 
            el.toLowerCase() === value[key as keyof FormObject<Keys, string>]!.toLowerCase())
            ) {
              fails[key as keyof FormObject<Keys, string[]>] = [
                ...fails[key as keyof FormObject<Keys, string[]>]!,
                wrongMessageOBJ(value, key)[1].wrongMessage,
              ];

              isValidInput = false;
          }
        }

        response({
          success: isValidInput,
          fails,
          message: isValidInput ? 'Data correct' : 'Data is not valid',
        });
      }, DELAY));
  
      if (!response.success) {
        return rejectWithValue(response);
      }
      
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const inputSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    setInput: (state: InputState, action: PayloadAction<{
      key: Keys,
      value: any,
    }>) => {
      state.storage[action.payload.key as keyof InputsType<string>] = action.payload.value;
    },
    setResult: (state) => {
      state.result = state.storage;
      state.storage = initialState.storage;
    },
    clearState: (state: InputState) => {
      console.log('resetState');

      state.result = initialState.result;
      state.isCorrectDataForm1 = initialState.isCorrectDataForm1;
      state.validationFails = initialState.validationFails;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateAsync.pending, (state: InputState) => {
        console.log('validateAsync.pending');

        state.status = 'loading';
        state.errorMessage1 = initialState.errorMessage1;
      })
      .addCase(validateAsync.fulfilled, (state: InputState, action) => {
        console.log('validateAsync.fulfilled', action);
        state.status = 'idle';
        state.isCorrectDataForm1 = true;

        console.log('action.meta.arg', action.meta.arg);

        Object.keys(action.meta.arg).forEach(key => {
          state.isCorrect[key as keyof InputsType<boolean>] = true;
        });
        state.validationFails = {...state.validationFails, ...action.payload.fails};
      })
      .addCase(validateAsync.rejected, (
        state: InputState,
        action: any) => {
        console.log('validateAsync.rejected', action);

        state.status = 'reject';
        state.errorMessage1 = action.payload.message;
        state.validationFails = {...state.validationFails, ...action.payload.fails};
        state.isCorrectDataForm1 = false;
      })
  },
});

export default inputSlice.reducer;
export const {
  setInput,
  setResult,
  clearState,
} = inputSlice.actions;

export const selectInputs = (state: RootState) => state.inputs.storage;
export const selectIsLoading = (state: RootState) => state.inputs.status === 'loading';
export const selectIsReject = (state: RootState) => state.inputs.status === 'reject';
export const selectValidations = (state: RootState) => state.inputs.validationFails;
export const selectError = (state: RootState) => state.inputs.errorMessage1;
export const selectIsCorrectDataForm1 = (state: RootState) => state.inputs.isCorrectDataForm1;
export const selectResult = (state: RootState) => state.inputs.result;
