import { PayloadAction } from "@reduxjs/toolkit";
import classNames from "classnames";
import React, { ChangeEvent, FunctionComponent, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { selectInputs, selectIsLoading, selectValidations, setInput, validateAsync } from "../../store/features/Inputs/inputSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ErrorType, InputsType, KeysForm1, ValidData1, ValueForm, ValueForm1 } from "../../type/Error";
import './PageForm1.scss'

localStorage.clear()

export const PageForm1: FunctionComponent = () => {
  const valueStore = useAppSelector(selectInputs);
  const fails = useAppSelector(selectValidations);
  const [value, setValue] = useState<ValueForm>({
    carBrand: valueStore.carBrand,
    zipCode: valueStore.zipCode,
  });
  const [showFails, setShowFails] = useState<InputsType<boolean>>({
    // carBrand: !!fails.carBrand?.length,
    // zipCode: !!fails.zipCode?.length,
    // firstName: !!fails.firstName?.length,
    // lastName: !!fails.lastName?.length,
    // carModel: !!fails.carBrand?.length,
    // firstRegistration: !!fails.firstRegistration?.length,
    carBrand: true,
    zipCode: true,
    firstName: true,
    lastName: true,
    carModel: true,
    firstRegistration: true,
  });
  const [message, setMessage] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectIsLoading);


  // useEffect(() => {
  //   console.log(fails);

  //   for(const key in fails) {
  //     setShowFails({
  //       ...showFails,
  //       [key]: fails[key as keyof InputsType<string[]>]!.length
  //     })
  //   }
  // }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => { 
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

    if (showFails[e.target.name as keyof InputsType<boolean>]) {}
    setShowFails({
      ...showFails,
      [e.target.name]: false,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
  } = await dispatch(validateAsync(value));

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

    for(const key in value){
      setShowFails(showFails => ({
        ...showFails,
        [key]: true,
      }));
    }
  };

  console.log('fails = ', fails);
  // console.log('showFails = ', showFails);

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

              {showFails[key as keyof ValueForm] &&
                <ul key={key}>
                  {fails[key as keyof ErrorType]!.map((e: string) => (
                    <li key={e}>{e}</li>
                    ))}
                </ul>
              }
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
 