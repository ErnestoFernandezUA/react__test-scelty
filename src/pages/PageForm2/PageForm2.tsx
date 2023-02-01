import { PayloadAction } from "@reduxjs/toolkit";
import classNames from "classnames";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { selectInputs, selectIsCorrectDataForm1, selectIsLoading, selectValidations, setInput, setResult, validateAsync } from "../../store/features/Inputs/inputSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ErrorType, InputsType, KeysForm2, ValidData, ValueForm } from "../../type/FormObject";
import './PageForm2.scss'

export const PageForm2: FunctionComponent = () => {
  const valueStore = useAppSelector(selectInputs);
  const fails = useAppSelector(selectValidations);
  const [showFails, setShowFails] = useState<InputsType<boolean>>({
    carBrand: true,
    zipCode: true,
    firstName: true,
    lastName: true,
    carModel: true,
    firstRegistration: true,
  });
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<ValueForm>({
    firstName: valueStore.firstName,
    lastName: valueStore.lastName,
    carModel: valueStore.carModel,
    firstRegistration: valueStore.firstRegistration,
  });
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

  if (showFails[e.target.name as keyof InputsType<boolean>]) {
    setShowFails({
      ...showFails,
      [e.target.name]: false,
    });
  }
};

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    for(const key in value){
      dispatch(setInput({
        key: key as KeysForm2,
        value: value[key as keyof ValueForm]
      }));
    }

    const response: PayloadAction<{
          success: boolean;
          fails: ValidData;
          message: string;
      } | undefined, string, {
          arg: ValueForm;
          requestId: string;
          requestStatus: "fulfilled";
      }, never> | {
          payload: any;
          type: string;
      } = await dispatch(validateAsync(value));

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

      {showStepLoader && (
        <div className="PageForm2__StepLoader">
          <div className="PageForm2__StepLoader-inner"></div>
        </div>)}

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
                value={value[key as keyof ValueForm]}
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
    </div>
  );
}
 