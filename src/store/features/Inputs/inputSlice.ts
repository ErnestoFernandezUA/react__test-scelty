import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import {
  RootState,
} from '../..';
import { InputsType } from '../../../type/InputType';
import {
  Error1, Error2, KeysForm1, KeysForm2, ValidData, ValidData1, ValidData2, ValueForm1, ValueForm2, Error, ValueForm, Value, KeysForm, 
} from '../../../type/Error';

const validData: ValidData1 = {
  carBrand: ['Audi', 'BMW', 'Nissan'],
  zipCode: ['65000', '66000', '67000', '68000'],
}

const validDataAll: ValidData = {
  carBrand: ['Audi', 'BMW', 'Nissan'],
  zipCode: ['65000', '66000', '67000', '68000'],
}

const DELAY = 1000;
// type ValidData1 = {[key in KeysForm1]: string[]};
// type ValidData2 = {[key in KeysForm2]: string[]};
// type ValueForm1 = {[key in KeysForm1]: string};
// type ValueForm2 = {[key in KeysForm2]: string};
// type Error1 = {[key in KeysForm1]: string[]};
// type Error2 = {[key in KeysForm2]: string[]};

// interface InputsType<T> {
//   carBrand: T,
//   zipCode: T,
//   firstName: T,
//   lastName: T,
//   carModel: T,
//   firstRegistration: T,
// }

const validMatrix = (key: string) => ({
  [key]: [
    {applyRules: true, wrongMessage: `${key} is required!`},
    {applyRules: true, wrongMessage: `value of ${key} is not valid!`},
    ],
  // carBrand: [
  //   {applyRules: true, wrongMessage: `${key} is required!`},
  //   {applyRules: true, wrongMessage: `value of ${key} is not valid!`},
  //   ],
  // zipCode: [true, false],
  // firstName: [true, false],
  // lastName: [true, false],
  // carModel: [true, false],
  // firstRegistration: [true, false],
})

export interface InputState {
  storage: InputsType<string>,

  status: 'idle' | 'loading' | 'reject',
  errorMessage1: string,
  errorMessage2: string,
  validationFails: InputsType<string[]>,

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

export const validateAsyncForm1 = createAsyncThunk(
  'inputs/validateForm1',
  async (
    // keys: keys as KeysForm1 | KeysForm2,
      value:ValueForm1,
    { rejectWithValue, getState },
    ) => {
    try {
      const response: {
        success: boolean,
        fails: ValidData1,
        message: string,
      } = await new Promise(res => setTimeout(() => {
        let isValidInput = true;

        const fails: ValidData1 = {
          carBrand: [],
          zipCode: [],
          // firstName: [],
          // lastName: [],
          // carModel: [],
          // firstRegistration: [],
        };

        for(const key in value){
          if (!value[key as keyof ValueForm1]) {
            console.log(value[key as keyof ValueForm1]);
            // setError(error => ({
            //   ...error,
            fails[key as keyof Error1] = [...fails[key as keyof Error1], `${key} is required!`];
            // // }));
            isValidInput = false;
          }

        if (!validData[key as keyof ValidData1]
          .some(el => el.toLowerCase() === value[key as keyof ValueForm1].toLowerCase())) {
            fails[key as keyof Error1] = [...fails[key as keyof Error1], `value of ${key} is not valid!`];
            isValidInput = false;
          }
        }


        res({
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

export const validateAsyncForm2 = createAsyncThunk(
  'inputs/validateForm2',
  async (
    value:ValueForm2,
    { rejectWithValue },
    ) => {
    try {
      const response: {
        success: boolean,
        fails: ValidData2,
        message: string,
      } = await new Promise(res => setTimeout(() => {
        let isValidInput = true;

        const fails: ValidData2 = {
          // carBrand: [],
          // zipCode: [],
          firstName: [],
          lastName: [],
          carModel: [],
          firstRegistration: [],
        };

        for(const key in value){
          if (!value[key as keyof ValueForm2]) {
            console.log(value[key as keyof ValueForm2]);
            // setError(error => ({
            //   ...error,
            fails[key as keyof Error2] = [...fails[key as keyof Error2], `${key} is required!`];
            // // }));
            isValidInput = false;
          }

        // if (!validData[key as keyof ValidData1]
        //   .some(el => el.toLowerCase() === value[key as keyof ValueForm1].toLowerCase())) {
        //     fails[key as keyof Error1] = [...fails[key as keyof Error1], `value of ${key} is not valid!`];
        //     isValidInput = false;
        //   }
        }

        res({
          success: isValidInput,
          fails,
          message: isValidInput ? 'Data correct' : 'Data is not valid',
        })
      }, DELAY));
  
      if (!response.success) {
        return rejectWithValue(response);
      }
      
      return response;
    } catch (error) {
      
    }

  },
);

export const validateAsync = createAsyncThunk(
  'inputs/validateFormAll',
  async (
      value:Value<KeysForm, string>,
    { rejectWithValue, getState },
    ) => {
    const state =  getState() as RootState;

    try {
      const response: {
        success: boolean,
        fails: Value<KeysForm, string[]>,
        message: string,
      } = await new Promise(res => setTimeout(() => {
        let isValidInput = true;

        const fails: Value<KeysForm, string[]> = {
          ...state.inputs.validationFails,
          // carBrand: [],
          // zipCode: [],
          // firstName: [],
          // lastName: [],
          // carModel: [],
          // firstRegistration: [],
        };

        for(const key in value){
          if (!value[key as keyof Value<KeysForm, string>]) {
            console.log(value[key as keyof Value<KeysForm, string>]);

            fails[key as keyof Error] = [
              ...fails[key as keyof Value<KeysForm, string[]>]!,
               `${key} is required!`,
            ];

            isValidInput = false;
          }

          if (!(validDataAll[key as keyof Value<KeysForm, string[]>]!)
            .some((el: string) => 
            el.toLowerCase() === value[key as keyof Value<KeysForm, string>]!.toLowerCase())) {
              fails[key as keyof Value<KeysForm, string[]>] = [
                ...fails[key as keyof Value<KeysForm, string[]>]!,
                `value of ${key} is not valid!`,
              ];

            isValidInput = false;
          }
        }

        res({
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
      key: KeysForm1 | KeysForm2,
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
      .addCase(validateAsyncForm1.pending, (state: InputState) => {
        console.log('fetchAsync.pending');

        state.isCorrectDataForm1 = false;
        state.status = 'loading';
        state.errorMessage1 = initialState.errorMessage1;
        // state.validationFails = initialState.validationFails;
      })
      .addCase(validateAsyncForm1.fulfilled, (state: InputState, action) => {
        console.log('validateAsyncForm1.fulfilled', action);
        state.status = 'idle';
        state.isCorrectDataForm1 = true;
      })
      .addCase(validateAsyncForm1.rejected, (
        state: InputState,
        action: any) => {
        console.log('validateAsyncForm1.rejected', action);

        state.status = 'reject';
        state.errorMessage1 = action.payload.message;
        state.validationFails = {...state.validationFails, ...action.payload.fails};
        state.isCorrectDataForm1 = false;
      })

      .addCase(validateAsyncForm2.pending, (state) => {
        console.log('fetchAsync.pending');

        state.status = 'loading';
        state.errorMessage2 = initialState.errorMessage2;
        // state.validationFails = initialState.validationFails;
      })
      .addCase(validateAsyncForm2.fulfilled, (
        state: InputState,
        action: any
        ) => {
        console.log('validateAsyncForm1.fulfilled', action);
        state.status = 'idle';
      })
      .addCase(validateAsyncForm2.rejected, (
        state: InputState,
        action: any) => {
        console.log('validateAsyncForm1.rejected', action);

        state.status = 'reject';
        state.errorMessage1 = action.payload.message;
        state.validationFails = {...state.validationFails, ...action.payload.fails};
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
