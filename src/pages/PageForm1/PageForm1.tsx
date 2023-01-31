import { PayloadAction } from "@reduxjs/toolkit";
import classNames from "classnames";
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { selectInputs, selectIsLoading, selectValidations, setInput, validateAsyncForm1 } from "../../store/features/Inputs/inputSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Error1, KeysForm1, ValidData1, ValueForm1 } from "../../type/Error";
import './PageForm1.scss'

const initialErrors = {
  carBrand: [],
  zipCode: [],
};

// export type KeysForm1 = 'carBrand' | 'zipCode';
// type ValidData1 = {[key in KeysForm1]: string[]};
// type ValueForm1 = {[key in KeysForm1]: string};
// type Error1 = {[key in KeysForm1]: string[]};


const validData: ValidData1 = {
  carBrand: ['Audi', 'BMW', 'Nissan'],
  zipCode: ['65000', '66000', '67000', '68000'],
}

export const PageForm1: FunctionComponent = () => {
  const valueStore = useAppSelector(selectInputs);
  const fails = useAppSelector(selectValidations);
  const [value, setValue] = useState<ValueForm1>({
    carBrand: valueStore.carBrand,
    zipCode: valueStore.zipCode,
  });
  const [showFails, setShowFails] = useState({});
  const [error, setError] = useState<Error1>(fails);
  const [message, setMessage] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectIsLoading);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => { 
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: initialErrors[e.target.name as keyof Error1],
    })
  };

  const isValid = () => {
    setError(initialErrors);
    let isValidInput = true;

    for(const key in value){
      if (!value[key as keyof ValueForm1]) {
        setError(error => ({
          ...error,
          [key as keyof Error1]:[...error[key as keyof Error1], `${key} is required!`],
        }));
        isValidInput = false;
      }

      if (!validData[key as keyof ValidData1]
        .some(el => el.toLowerCase() === value[key as keyof ValueForm1].toLowerCase())) {
          setError(error => ({
            ...error,
            [key as keyof Error1]:[...error[key as keyof Error1], `value of ${key} is not valid!`],
          }));
        isValidInput = false;
      }
    }

    if (!isValidInput) {
      console.log('is not valid!');
    }

    return isValidInput;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('dispatch(validateAsyncForm1(value))');
    
    for(const key in value){
      dispatch(setInput({
        key: key as KeysForm1,
        value: value[key as keyof ValueForm1]
      }));
    }

    const response: PayloadAction<{
      success: boolean;
      fails: ValidData1;
      message: string;
  } | undefined, string, {
      arg: ValueForm1;
      requestId: string;
      requestStatus: "fulfilled";
  }, never> | {
      payload: any;
      type: string;
  } = await dispatch(validateAsyncForm1(value));

    console.log('page1//', response );
    setMessage(response.payload.message);
    setSuccess(response.payload.success);
    setShowPopup(true);

    if (response.payload.success) {
      setTimeout(() => {
        setShowPopup(false);
        setSuccess(false);
        navigate('/form2');
      }, 2000)
    }
  };

  return (
    <div className="PageForm1">
      <div className="PageForm1__nav">
        <Link to={'/'} className="PageForm1__button-back">
          <button>Back</button>
        </Link>

        <Link to={'/form2'}>
          <button>Goto Form#2</button>
        </Link>
      </div>

      <h2>Form1</h2>

      {showPopup && (
        <h3 className={classNames('PageForm1__message',
          { 'PageForm1__message--success': success})}
        >
          {message}
        </h3>
      )}
      
      {isLoading && <p>Loading.....</p>}

      <form onSubmit={onSubmit}>
        {Object.keys(value).map(key => (
          <div key={key} className="PageForm1__input-container">
            <label htmlFor={key}>
              {key}:&nbsp;
              <input
                id={key}
                type="text"
                name={key}
                value={value[key as keyof ValueForm1]}
                onChange={onChange}
                placeholder={`input ${key}`}
              />

              <ul>
                {fails[key as keyof Error1].map(e => (
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
        
        <div className="PageForm1__correctData">
          <p>Correct data</p><br/>
          <p>CarBrand: bmw, audi, nissan</p><br/>
          <p>zipCode: 65000, 66000, 67000, 68000</p>
        </div>

      


    </div>
  );
}
 