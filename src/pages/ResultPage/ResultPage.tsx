import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { setInput } from "../../features/Inputs/inputSlice";
import { useAppDispatch } from "../../store/hooks";
import './ResultPage.scss'
 
const initialValues = {
  carBrand: '',
  zipCode: '',
};

const initialErrors = {
  carBrand: [],
  zipCode: [],
};

export type KeysForm1 = 'carBrand' | 'zipCode';
type ValidData = {[key in KeysForm1]: string[]}
type ValueForm1 = {[key in KeysForm1]: string};
type Error = {[key in KeysForm1]: string[]}

const validData: ValidData = {
  carBrand: ['Audi', 'BMW', 'Nissan'],
  zipCode: ['65000', '66000', '67000', '68000'],
}

export const ResultPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<ValueForm1>(initialValues);
  const [error, setError] = useState<Error>(initialErrors);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => { 
  //   setValue({
  //     ...value,
  //     [e.target.name]: e.target.value,
  //   });

  //   setError({
  //     ...error,
  //     [e.target.name]: initialErrors[e.target.name as keyof Error],
  //   })
  // };

  // const isValid = () => {
  //   setError(initialErrors);
  //   let isValidInput = true;

  //   for(const key in value){
  //     if (!value[key as keyof ValueForm1]) {
  //       setError(error => ({
  //         ...error,
  //         [key as keyof Error]:[...error[key as keyof Error], `${key} is required!`],
  //       }));
  //       isValidInput = false;
  //     }

  //     if (!validData[key as keyof ValidData]
  //       .some(el => el.toLowerCase() === value[key as keyof ValueForm1].toLowerCase())) {
  //         setError(error => ({
  //           ...error,
  //           [key as keyof Error]:[...error[key as keyof Error], `value of ${key} is not valid!`],
  //         }));
  //       isValidInput = false;
  //     }
  //   }

  //   console.log('isValidInput', isValidInput);

  //   if (!isValidInput) {
  //     console.log('is not valid!');
  //   }

  //   return isValidInput;
  // };

  // const onSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (isValid()) {
  //     setTimeout(() => {
  //       for(const key in value){
  //         dispatch(setInput({
  //           key: key as KeysForm1,
  //           value: value[key as keyof ValueForm1]
  //         }))
  //       }

  //       setValue(initialValues);
  //       navigate('/form2');
  //     }, 2000)
  //   } else {
  //     console.log('show popup wrong data');
  //     setShowPopup(true);
  //     setTimeout(() => {
  //       setShowPopup(false);
  //     }, 3000)
  //   }
  // };

  console.log(value, error);

  return (
    <div className="ResultPage">
      <h2>ResultPage</h2>
      
      {/* <form onSubmit={onSubmit}>
        {Object.keys(value).map(key => (
          <div key={key}>
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
              </label>
            <br />
            <ul>
              {error[key as keyof Error].map(e => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={onSubmit}
        >
          Submit
        </button>
      </form> */}
      
      {/* {showPopup && (
        <h2>show popup wrong data</h2>
      )}
       */}

      <Link to={'/'}>Back</Link>
      &nbsp;
      <Link to={'/form2'}>Form2</Link>


    </div>
  );
}
 