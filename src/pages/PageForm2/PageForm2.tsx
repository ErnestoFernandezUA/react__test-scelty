import { PayloadAction } from "@reduxjs/toolkit";
import classNames from "classnames";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { selectInputs, selectIsCorrectDataForm1, selectIsLoading, selectValidations, setInput, setResult, validateAsyncForm2 } from "../../store/features/Inputs/inputSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Error2, KeysForm2, ValidData2, ValueForm2 } from "../../type/Error";
import './PageForm2.scss'

const initialErrors = {
  firstName: [],
  lastName: [],
  carModel: [],
  firstRegistration: [],
};

// export type KeysForm2 = 'firstName' | 'lastName' | 'carModel' | 'firstRegistration';
// type ValueForm2 = {[key in KeysForm2]: string};
// type ValidData2 = {[key in KeysForm2]: string[]};
// type Error2 = {[key in KeysForm2]: string[]}

export const PageForm2: FunctionComponent = () => {
  const valueStore = useAppSelector(selectInputs);
  const fails = useAppSelector(selectValidations);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<ValueForm2>({
    firstName: valueStore.firstName,
    lastName: valueStore.lastName,
    carModel: valueStore.carModel,
    firstRegistration: valueStore.firstRegistration,
  });
  const [error, setError] = useState<Error2>(fails);
  const [message, setMessage] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectIsLoading);
  const isCorrectDataForm1 = useAppSelector(selectIsCorrectDataForm1);
  const coin = Math.random() < 0.5;
  const [showStepLoader, setShowStepLoader] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue({
    ...value,
    [e.target.name]: e.target.value,
  });

  setError({
    ...error,
    [e.target.name]: initialErrors[e.target.name as keyof Error2],
  })
};

const isValid = () => {
  setError(initialErrors);
  let isValidInput = true;

  for(const key in value){
    if (!value[key as keyof ValueForm2]) {
      setError(error => ({
        ...error,
        [key as keyof Error2]:[...error[key as keyof Error2], `${key} is required!`],
      }));
      isValidInput = false;
    }
  }

  console.log('isValidInput', isValidInput);

  if (!isValidInput) {
    console.log('is not valid!');
  }

  return isValidInput;
};

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // dispatch(validateAsyncForm2(value));
    for(const key in value){
      dispatch(setInput({
        key: key as KeysForm2,
        value: value[key as keyof ValueForm2]
      }));
    }

    const response: PayloadAction<{
          success: boolean;
          fails: ValidData2;
          message: string;
      } | undefined, string, {
          arg: ValueForm2;
          requestId: string;
          requestStatus: "fulfilled";
      }, never> | {
          payload: any;
          type: string;
      } = await dispatch(validateAsyncForm2(value));

    console.log('page2//', response);

    setMessage(response.payload.message);
    setSuccess(response.payload.success);
    setShowPopup(true);

    if (response.payload.success) {
      setShowStepLoader(true);

      setTimeout(() => {
        if (isCorrectDataForm1) {
          setTimeout(() => {
            setShowPopup(false);
            setSuccess(false);
            console.log('to result');
            dispatch(setResult());
            navigate(coin ? '/result1' : '/result2');
            setShowStepLoader(false);
          }, 6000)
        }
      }, 1000)
    }
  };

  return (
    <div className="PageForm2">
      <div className="PageForm2__nav">
        <Link to={'/form1'} className="PageForm2__button-back">
          <button>Goto Form#1</button>
        </Link>
      </div>

      <h2>Form 2</h2>

      {showStepLoader && <div className="PageForm2__StepLoader">StepLoader</div>}

      {showPopup && (
        <h3 className={classNames('PageForm2__message',
          { 'PageForm2__message--success': success})}
        >
          {message}
          </h3>
      )}

      {isLoading && <p>Loading.....</p>}

      <form onSubmit={onSubmit}>
        {Object.keys(value).map(key => (
          <div key={key} className="PageForm2__input-container">
            <label htmlFor={key}>
              {key}:&nbsp;
              <input
                id={key}
                type="text"
                name={key}
                value={value[key as keyof ValueForm2]}
                onChange={onChange}
                placeholder={`input ${key}`}
              />

              <ul>
                {fails[key as keyof Error2].map(e => (
                  <li key={e}>{e}</li>
                  ))}
              </ul>
            </label>
          </div>
        ))}

        <button
          onClick={onSubmit}
          className="PageForm1__input-submit"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
 